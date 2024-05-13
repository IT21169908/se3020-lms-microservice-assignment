'use strict'
const status = require('http-status')

module.exports = ({repo}, app) => {
    app.post('/payments/make-purchase', (req, res, next) => {
        const {validate} = req.container.cradle

        validate(req.body.paymentOrder, 'payment')
            .then(payment => {
                return repo.savePayment(payment)
            })
            .then(paid => {
                res.status(status.OK).json({paid})
            })
            .catch(next)
    })

    app.get('/payments/:id', (req, res, next) => {
        repo.getPaymentById(req.params.id)
            .then(payment => {
                res.status(status.OK).json({payment})
            })
            .catch(next)
    })
}
