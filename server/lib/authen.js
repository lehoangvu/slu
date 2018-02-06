const authen = (req, res, next) => {
	res.json({
		message: 'Authen wall'
	})
	next();
}
export default authen