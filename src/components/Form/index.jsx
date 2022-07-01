import { TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FireButton from "../FireButton";
import './styles.css'
import { useState } from "react";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().min(6, "Enter a password of at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().required("Enter a password of at least 6 characters").oneOf([yup.ref("password")], "Confirmation must be the same as the password'"),

  }).required();

export default function Form() {
    const [ finish, setFinish ] = useState(false)
    const [ name, setName ] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = (useData) => {
        console.log(useData)
        setName(useData.name)        
        setFinish(true)
    }

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="form"
        >
            <Typography variant="h3" className="title">
                Iniciar sessão
            </Typography>

            <TextField 
                type="text"
                label="User name" 
                variant="outlined"
                {...register("name", {required: true})}
                className="input"
            />
            
            <span>{errors.name?.message}</span>

            <TextField 
                type="text"
                label="Email" 
                variant="outlined"
                {...register("email", {required: true})}
                className="input"
            />
            
            <span>{errors.email?.message}</span>

            <TextField 
                type="password"
                label="Password" 
                variant="outlined"
                {...register("password", {required: true})}
                className="input"
            />

            <span>{errors.password?.message}</span>

            <TextField 
                type="password"
                label="Confirm password" 
                variant="outlined"
                {...register("confirmPassword", {required: true})}
                className="input"
            />

            <span>{errors.confirmPassword?.message}</span>

            <FireButton 
                type="submit"
                name="Entrar"
            />

            { finish === true && <h3>Seja bem vindo, {name}.</h3> }
        </form>
    )
}