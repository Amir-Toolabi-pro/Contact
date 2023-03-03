
import "../../../styles/notfound.css"

const NotFound = () => {
  return (
    <>
      <div className="notfound_container">
        <h3>مخاطبی وجود ندارد ...</h3>
        <img src={require("../../../images/no-found.gif")} alt="" />
      </div>
    </>
  );
}

export default NotFound;