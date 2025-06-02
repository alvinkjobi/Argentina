function TeamInfo({ title, children, image, rightAlign, imageRight }) {
  if (image) {
    return (
      <div className="team-info-container team-info-flex">
        {!imageRight && (
          <img src={image} alt="Team" className="team-info-img" />
        )}
        <div
          className="team-info-content"
          style={{ textAlign: rightAlign ? "right" : "left" }}
        >
          {title && <h3 className="team-info-title">{title}</h3>}
          {children}
        </div>
        {imageRight && (
          <img src={image} alt="Team" className="team-info-img" />
        )}
      </div>
    );
  }
  return (
    <div className="team-info-container">
      {title && <h3 className="team-info-title">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

export default TeamInfo;
