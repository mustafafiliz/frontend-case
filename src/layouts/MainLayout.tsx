import { Outlet } from "react-router-dom";
import { Basket, Header } from "../components";
import { Container } from "../components/UI";

type Props = {
  basket?: boolean;
};

const MainLayout = ({ basket = true }: Props) => {
  return (
    <>
      <Header />
      <main className="pt-[26px] lg:px-0 px-5 pb-10">
        <Container>
          <div className="flex">
            <div className="flex-1">
              <Outlet />
            </div>
            {basket && (
              <div className="hidden lg:block pl-9">
                <Basket />
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
};

export default MainLayout;
