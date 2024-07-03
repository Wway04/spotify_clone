import Button from "../Button";
import "./Preview.scss";
function Preview() {
  return (
    <div className="preview">
      <div className="preview-inner">
        <div className="inner-left">
          <h6>Preview of Spotify</h6>
          <span className="">
            Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
          </span>
        </div>
        <div className="inner-rigth">
          <Button type="medium">Sign up free</Button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
