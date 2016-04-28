

function submitAuthentication(username, password)
{
	//Update logic to send to WAS Server
	WL.Logger.info("Authenticaiton Submitted for User: " + username);
	if ((username.toLowerCase()==="garcia" && password === "demo01") ||
			(username.toLowerCase()==="meltzer" && password === "demo02") ||
			(username.toLowerCase()==="snyder" && password === "demo03") ||
			(username.toLowerCase()==="gaul" && password === "demo04") ||
			(username.toLowerCase()==="monson" && password === "demo05") ||
			(username.toLowerCase()==="defelice" && password === "demo06") ||
			(username.toLowerCase()==="veron" && password === "demo07") ||
			(username.toLowerCase()==="demo" && password === "demo") )
	{

		var userIdentity = {
				userId: username,
				displayName: username,
				attributes: {
					role: "bankUser"
				}
		};

		WL.Server.setActiveUser("AdapterAuthRealm", userIdentity);

		return {
			authRequired: false
		};
	}

	return onAuthRequired(null, "Invalid login credentials");
}

function onAuthRequired(headers,errorMessage)
{
	errorMessage = errorMessage ? errorMessage:null;
	return {
		authRequired:true,
		errorMessage:errorMessage
	};
}

function onLogout()
{
	WL.Server.setActiveUser("AdapterAuthRealm", null);
	WL.Logger.debug("Logged out");
}
