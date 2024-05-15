import { useSelector } from "react-redux";
import { PortfeilIcon, ProfileIcon } from "../Icons";
import { Container, Input, Logo } from "../UI";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectTotalCartPrice } from "../../redux/slices/appSlice";

const Header = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const [q, setQ] = useState(params.get("q") || "");
  const totalCartPrice = useSelector(selectTotalCartPrice);
  const handleSearch = (value: string) => {
    setQ(value);
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (q === "" && !params.get("q")) return;
    else if (q === "" && params.get("q")) navigate("/");
    else navigate(`/?q=${q}`);
  };

  useEffect(() => {
    if (pathname === "/detail") setQ("");
  }, [pathname]);

  return (
    <header className="bg-primary-500 h-[50px] py-[5px] lg:px-0 px-5 z-10">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-[129px]">
          <Logo />
          <form
            data-testid="header-search-container"
            onSubmit={handleSubmit}
            className="hidden lg:block"
          >
            <Input
              id="header-search"
              onSubmit={handleSubmit}
              value={q}
              onChange={handleSearch}
            />
            <button type="submit" className="hidden" />
          </form>
        </div>
        <div className="flex items-center gap-4 text-white">
          <div
            data-testid="total-price-heading"
            className="hidden lg:flex items-center gap-2.5"
          >
            <PortfeilIcon />
            <span>{totalCartPrice} ₺</span>
          </div>
          <div className="flex items-center gap-1">
            <ProfileIcon />
            <span>Kerem</span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
