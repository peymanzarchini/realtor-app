import { useSelector } from "react-redux";
import Container from "../../components/Styles/Container";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <section className="py-10">
      <h1 className="text-3xl text-center font-semibold">Profile</h1>
      <Container classProps="max-w-[650px]">
        <form className="flex flex-col gap-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <input
            type="text"
            name="fullname"
            className="border p-3 rounded-lg"
            placeholder="fullname"
          />
          <input type="email" name="email" className="border p-3 rounded-lg" placeholder="email" />
          <input
            type="password"
            name="password"
            className="border p-3 rounded-lg"
            placeholder="password"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">
            update
          </button>
        </form>
        <section className="flex justify-between mt-4">
          <div className="text-red-600 cursor-pointer font-bold">Delete Account</div>
          <div className="text-red-600 cursor-pointer font-bold">Sign out</div>
        </section>
      </Container>
    </section>
  );
};

export default Profile;
