import { useState, useEffect } from "react";
import { supabase } from "../supabase"; 
import "../CSS/Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    username: "Log-in",
    avatar_url: "/default-avatar.png", // путь к базовому аватару
  });

  // Подписка на авторизацию
  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener?.unsubscribe();
  }, []);

  // Получаем данные профиля из таблицы "profiles" (если есть)
  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single()
        .then(({ data, error }) => {
          if (data) {
            setProfile({
              username: data.username || "No name",
              avatar_url: data.avatar_url || "/default-avatar.png",
            });
          }
        });
    } else {
      // Если нет пользователя, показываем дефолт
      setProfile({
        username: "Log-in",
        avatar_url: "/default-avatar.png",
      });
    }
  }, [user]);

  function reconect() {
    window.location.href = "./";
  }

  return (
    <>
      <div className="headerBox" style={{ display: "flex" }}>
        <div className="leftItemsBar" style={{ display: "flex", gap: "15px" }}>
          <div
            className={`burger-menu ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="logo" onClick={reconect}>
            Professional
          </div>
        </div>

        <div className="centerItems"></div>

        <div className="rightItemsBar">
          <div className="profilePlaceholder">
            <div
              className="profileImage"
              style={{
                backgroundImage: `url(${profile.avatar_url})`,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="profileUsername">{profile.username}</div>
          </div>
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
