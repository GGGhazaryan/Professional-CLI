import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../CSS/Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    username: "Log-in",
    avatar_url: "/default-avatar.png", // положи дефолтный аватар в public/
  });

  const navigate = useNavigate();

  // Подписка на авторизацию
  useEffect(() => {
    async function getCurrentUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    }

    getCurrentUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Получаем данные профиля из таблицы "profiles"
  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            username: data.username || "No name",
            avatar_url: data.avatar_url || "/default-avatar.png",
          });
        } else {
          setProfile({
            username: "No name",
            avatar_url: "/default-avatar.png",
          });
        }
      } else {
        setProfile({
          username: "Log-in",
          avatar_url: "/default-avatar.png",
        });
      }
    }

    fetchProfile();
  }, [user]);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/log-in");
    } else {
      navigate("/reg");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="headerBox">
        <div className="leftItemsBar">
          <div
            className={`burger-menu ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="logo" onClick={() => navigate("/")}>
            Professional
          </div>
        </div>

        <div className="centerItems"></div>

        <div className="rightItemsBar">
          <div className="profilePlaceholder" onClick={handleProfileClick}>
            <div
              className="profileImage"
              style={{
                backgroundImage: `url(${profile.avatar_url})`,
              }}
            ></div>
            <div className="profileUsername">{profile.username}</div>
          </div>
          {user && (
            <button className="logoutBtn" onClick={handleLogout}>
              Выйти
            </button>
          )}
        </div>
      </div>

      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      <div className={`sidebar ${open ? "show" : ""}`}>
        <ul>
          <li onClick={() => setOpen(false)}>
            <i className="fa fa-home" /> Home
          </li>
          <li>
            <i className="fa fa-info-circle" /> About
          </li>
          <li>
            <i className="fa fa-phone" /> Contact
          </li>
          <li>
            <i className="fa fa-lock"></i> Privacy Policy
          </li>
          <li>
            <i className="fa fa-shield-alt"></i> Site Security
          </li>
          <li>
            <i className="fa fa-cog"></i> Settings
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
