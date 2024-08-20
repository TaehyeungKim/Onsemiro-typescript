import menu from "@/assets/buttons/hambg-menu.png";
import logo from "@/assets/logo/logo.png";
import login from "@/assets/buttons/login.png";
import Icon from "@/components/Icon";

export default function Header() {
  return (
    <header className="max-w-main-frame w-screen h-header-height flex flex-row items-center justify-between px-4 py-3 box-border border-b bg-white fixed top-0 z-10">
      <Icon src={menu} tag="button" className="w-8"></Icon>
      <Icon src={logo} tag="div" className="w-40"></Icon>
      <Icon src={login} tag="button" className="w-8"></Icon>
    </header>
  );
}
