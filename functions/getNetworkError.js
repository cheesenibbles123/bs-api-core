module.exports = {
	getMessageFromErrorCode: (text) => {
		if (text.includes('400')) return { code : 400, message : "Error 400 Bad Request" };
		if (text.includes('404')) return { code : 404, message : "Error 404 Page Not Found" };
		if (text.includes('403')) return { code : 403, message : "Error 403 Access Forbidden" };
		if (text.includes('500')) return { code : 500, message : "Error 500 Internal Server Error" };

		return { code : NaN, message : "Unknown Error", raw_data : text};
	}
}