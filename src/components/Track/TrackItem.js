import "./Track.scss";
import { Row, Col } from "react-bootstrap";
import { ms, m, s } from "time-convert";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useContext } from "react";

import { PlaylistActive } from "../../layouts/MainLayout/MainLayout";

function ListItem({ item, index, onAddItemPlayList }) {
  const { playlists } = useContext(PlaylistActive);
  console.log("🚀 ~ ListItem ~ playlists:", playlists);

  const handleMenuClick = (playlistId) => {
    onAddItemPlayList(playlistId, item?.id);
  };

  const items = playlists.map((playlist) => ({
    key: playlist.id,
    label: (
      <div
        role="button"
        style={{ minWidth: "100px", display: "inline-block", textAlign: "center" }}
        onclick={() => handleMenuClick(playlist.id)}
      >
        {playlist.name}
      </div>
    ),
  }));

  return (
    <div className={`list-item ${item.type}`} role="button">
      {item.type !== "track" ? (
        <>
          <div className="list-item-image">
            <img src={item?.images[0]?.url} alt="" width="50px" height="50px" />
          </div>
          <div className="list-item-content">
            <h6>{item.name}</h6>
            <span>{item.type}</span>
          </div>
        </>
      ) : (
        <div className="track-inner">
          <Row className="my-2">
            <Col className="d-flex  align-items-center" xl={1} lg={1} md={1} xs={1}>
              {index}
            </Col>
            <Col className="d-flex  align-items-center list-item-information" xl={7} lg={7} md={7} xs={7}>
              <img src={item?.album?.images[0]?.url} alt="" />
              <div className="list-item-content">
                <h6>{item.name}</h6>
                <span>
                  {item?.artists?.map((artist, index) => {
                    if (index < item.artists?.length - 1) {
                      return `${artist.name}, `;
                    }
                    return artist.name;
                  })}
                </span>
              </div>
            </Col>
            <Col className="d-flex  align-items-center" xl={2} lg={2} md={2} xs={2}>
              {item?.album?.name}
            </Col>
            <Col className="d-flex  align-items-center justify-content-center" xl={2} lg={2} md={2} xs={2}>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <button onClick={() => onAddItemPlayList(item.uri)}>
                  <i className="fa-solid fa-circle-plus" style={{ color: "#ffffff" }}></i>
                </button>
              </Dropdown>
              {ms
                .to(
                  m,
                  s
                )(item?.duration_ms)
                .map((n, index) => {
                  if (index === ms.to(m, s)(item?.duration_ms).length - 1) {
                    return n < 10 ? "0" + n : n.toString();
                  }
                  return n.toString();
                }) // zero-pad
                .join(":")}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ListItem;
