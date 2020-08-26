
//  sample code
exports.sampleMiddleware = (req, res, next) => {
    // console.log(req.headers)
    try{
        // let phone_no = jwt.decode(req.headers.token, process.env.JWT_SECRET).phone_no
        // req.phone_no = phone_no
        next()
    } catch (error)
    {
        res.send(400, 'Invalid Token.')
    }
}
