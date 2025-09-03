import ProfileCard from "./profileCard";

function App() {
  return (
    <div className="main">
      <div style={{ display: "flex" , justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <ProfileCard
          name="Hamza"
          bio="React learner, loves coding"
          image="https://via.placeholder.com/100"
        />
        <ProfileCard
          name="Anuj"
          bio="Full Stack Developer"
          image="https://via.placeholder.com/100"
        />
        <ProfileCard
          name="Vivek"
          bio="UI/UX Designer"
          image="https://via.placeholder.com/100"
        />
      </div>
    </div>
  );
}

export default App;
