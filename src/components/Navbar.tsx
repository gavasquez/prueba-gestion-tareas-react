import { CiDark, CiLight } from "react-icons/ci";
import { useUiStore } from "../store";

export const Navbar = () => {
  const theme = useUiStore().theme;
  const onChangeTheme = useUiStore().onChangeTheme;

  return (
    <nav className="bg-gray-200 border-b border-black dark:bg-gray-800 text-black dark:text-white px-6 py-4 shadow flex justify-between items-center">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold">
          Manage your tasks
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {theme ? <CiLight size={24} /> : <CiDark size={24} />}
        <input
          type="checkbox"
          className="toggle toggle-info bg-gray-400"
          checked={theme}
          onChange={onChangeTheme}
        />
      </div>
    </nav>
  );
};
