import styled from "styled-components";
import Logout from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkmodeToggle from "./DarkmodeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: o.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <DarkmodeToggle />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
