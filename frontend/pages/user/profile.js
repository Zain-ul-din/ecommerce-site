import { useContext } from "react";
import { userContext } from "../../Hooks/Context";
import UserProfileComponent from "../../components/UserProfile";

export default function UserProfile() {
  const context = useContext(userContext);
  return <> {context.user && <UserProfileComponent {...context} />} </>;
}
