import CMSBackButton from "./common/CMSBackButton";
import MainMenuEdit from "./extras/ExtrasEdit";

const MainMenu = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <MainMenuEdit />
  </>);
};

export default MainMenu;
