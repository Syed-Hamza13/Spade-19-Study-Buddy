function ProfileCard(props) {
  return (
    <div style={{
      border: "2px solid #a2eb7eff",
      borderRadius: "12px",
      padding: "16px",
      width: "250px",
      textAlign: "center",
      margin: "10px",
      boxShadow: "2px 2px 8px rgba(134, 149, 196, 0.1)",
      backgroundColor: "#87cdebff",
      color: "#ffffffff",
      justifyContent: "center",
        alignItems: "center",
        justifyItems: "center"
    }}>
      <img 
        src={props.image} 
        alt={props.name} 
        style={{width: "100px", borderRadius: "50%"}} 
      />
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
    </div>
  );
}

export default ProfileCard;
