// This check makes sure this is a JSON parsing issue, but it might be
// coming from any middleware, not just body-parser:
export const parserErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) 
        return res.sendStatus(400) // Bad request
    next()
}


