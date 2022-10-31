import  express  from 'express';
import urlencoded from 'express';




function aplicacion() {

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/tenis/tenistas', (req, res) =>{
    
    res.render('tenistas',{
       
    });
})

app.get('/tenis/canchas', (req, res) =>{
    
    res.render('canchas',{
       
    });
})

app.listen(8080, ()=>{
    console.log("iniciando...")
})

}

export default aplicacion;
