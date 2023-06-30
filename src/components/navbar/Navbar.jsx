import Logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="h-[10vh] w-full bg-[#F8F0E3] shadow-md">
      <div className="w-5/6 mx-auto h-full flex items-center justify-start gap-2">
        <img src={Logo} alt="Logo" className="h-[5vh]" />
        <h1 className="text-[28px] font-bold uppercase">
          Ecowiser <span className="text-primary text-[#4c835f]">Assignment</span>
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
