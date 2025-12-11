import { getRequestToken } from "@api/authApi";

const authService = async () => {
  try {
    const res = await getRequestToken();
    const requestToken = res.data.request_token;
    const redirectUrl = `${window.location.origin}/approved`;
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
  } catch (error) {
    console.error("cannot get request token", error);
  }
};

export default authService;
