import express from 'express';

var router = express.Router();

/* GET branches. */
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.get('db')
    const branches = await db.branch.findAll({});
    return res.json(branches)
  } catch (error) {
    next(error)
  }
});

/**
 * add new branch
 */
router.post('/', async (req, res, next) => {
  try {
    let owner = req.account.roles.find(role => role.name == "owner");
    if (owner) {
      const db = req.app.get('db')
      let data = req.body;
      data.id = await db.branch.max('id') + 1;
      const branch = db.branch.build(data)
      await branch.save()
      return res.status(201).json(branch)
    } else {
      return res.sendStatus(401)
    }
  } catch (error) {

    next(error)
  }
})


router.use('/:branchId', async (req, res, next) => {
  try {
    let owner = req.account.roles.find(role => role.name == "owner");
    if (owner) {
      const db = req.app.get('db')
      const branch = await db.branch.findByPk(req.params.branchId)
      if (branch) {
        req.branch = branch
        return next()
      }
      return res.sendStatus(404)
    } else {
      return res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

/**
 * update branch with branchId
 */
router.put('/:branchId', async (req, res) => {
  try {
    const { branch } = req;
    let data = req.body;

    branch.name = data.name
    branch.latitude = data.latitude
    branch.longitude = data.longitude
    branch.full_address = data.full_address

    branch
      .save()
      .then(() => res.send(branch))
      .catch((error) => {
        res.status(500).send(error)
      })
    return
  } catch (error) {
    res.status(500).send(error)
  }
})

/**
 * remove branch with branchId
 */
router.delete('/:branchId', async (req, res) => {
  try {
    req.branch.destroy((err) => {
      if (err) {
        return res.send(err)
      }
      return res.sendStatus(204)
    })
    res.json(req.branch)
  } catch (error) {
    res.status(500).send(error)
  }
})



export default router;
