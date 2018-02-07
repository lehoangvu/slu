import jwt from 'jsonwebtoken'

const SECRECT = 'ahii'

const authen = (req, res, next) => {
	const access_token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];
	if(access_token) {
		jwt.verify(access_token, SECRECT, (err, decoded) => {
	      if (err) {
	        return res.status(404).json({ error: 'Failed to authenticate token.' });
	      } else {
	        req.token_decoded = decoded;    
	        next();
	      }
	    });
	} else {
		res.status(404).json({
			error: 'Access token required'
		})
	}
}

const createToken = (payload, ops = {}) => {
	return jwt.sign(payload, SECRECT, {
		...ops
	});
}

export {
	createToken
}

export default authen