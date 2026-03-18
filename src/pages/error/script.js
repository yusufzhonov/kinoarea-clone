import { footer } from "../../components/footer"
import { header } from "../../components/header"
let backBtn = document.querySelector(".backBtn")
backBtn.onclick =()=>{
    window.location.href ="/"
    console.log(1);
    
}
header()
footer()