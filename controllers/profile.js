const handleProfileGet = (req, res, postgres) => {
  const { id } = req.params;
  postgres.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('Error in getting user'))
}

module.exports = {
  handleProfileGet
}