import mongoose from 'mongoose'

mongoose
.connect('mongodb://slu:1234qwerasdfzxcv@ds125388.mlab.com:25388/sludb')
.then(() => {
  console.log('connect ok')
}, err => {
  console.log('connect fail', err)
})

export default mongoose