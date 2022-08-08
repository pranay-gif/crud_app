const express= require("express");
const router = express();
const mongoose= require("mongoose");
const Employee= mongoose.model("Employee");
 router.get('/',(req,res)=>{
     res.render("employee/addOredit",{
         viewTitle: "Insert Employee"
     });
 });

router.post('/', (req, res) => {
    console.log(req.body);
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res){
  var e = new Employee();
  e.fullname = req.body.fullname;
  e.email = req.body.email;
  e.mobile = req.body.mobile;
  e.city = req.body.city;
  e.save((err, doc) => {
    if (!err)
        res.redirect('employee/list');
    else {
            console.log('Error during record insertion : ' + err);
    }
});

}
function updateRecord(req, res) {
    Employee.updateOne({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
                console.log('Error during record edit : ' + err);
        }
    });
}

router.get('/list',(req,res)=>{
    
    Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list:docs
            });
        }
        else {
            console.log('Error in employee list :' + err);
        }
    }).lean()

});
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc);
            res.render("employee/addOredit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
        else{
            console.log('Error in updatation :' + err);
        }
    }).lean()
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else {
            console.log('Error in employee remove :' + err);
        }
    });
});
module.exports= router;
