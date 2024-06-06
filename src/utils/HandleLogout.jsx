

export const HandleLogout = (WebUserLogout, navigate) => {
    const check = WebUserLogout()
    if (check) {
        navigate("/user/auth/login")
    }
}