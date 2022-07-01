import { Button} from "@mui/material";
import './styles.css'

export default function FireButton({ variant, type, name }) {
    return (
        <Button 
            variant = "contained" 
            type = {type}
            className="button"
        >
            { name }
        </Button>
    )
}