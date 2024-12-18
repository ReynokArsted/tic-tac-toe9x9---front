import { Component } from "react";
import { AppContext } from "./Context";
import { Link, Navigate } from "react-router-dom";


export class SignIn extends Component {
    state = {
        login: "",
        password: "",
        showPasswordKey: false,
        errorKey: null,
        errorPlace: null,
        SignInError: ""
    }

    static contextType = AppContext

    UpdateData = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
            errorKey: null
        })
    }

    ShowPassword = () => {
        this.setState({
            showPasswordKey: !this.state.showPasswordKey
        })
    }

    SignIn = async (userData) => {
        const {login} = this.context
        const jsonData = JSON.stringify(userData);
        try {
            const response = await fetch('http://localhost:9090/singIn', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: jsonData, 
            });

            const result = await response.json()
            if (result.error !== "") {
                this.setState({SignInError : result.error})
            } else {
                this.setState({SignInError: ""})
                login(result) // Функция для обновления контекста
            }
            //console.log("Ответ от API:", result);

            } catch (error) {
                console.error("Ошибка:", error);
            }
}            

    LogButtonClicked = async () => {
        const { login, password } = this.state

        if (login === "" || password === "") {
            this.setState({ errorKey: 1, SignInError: "" })
            return
        }

        if (login.startsWith(" ") === true || login.endsWith(" ") === true) {
            this.setState({ errorKey: 2, errorPlace: "логина", SignInError: ""})
            return
        }
        if (password.startsWith(" ") === true || password.endsWith(" ") === true) {
            this.setState({ errorKey: 2, errorPlace: "пароля", SignInError: ""})
            return
        }

        const data = {
            login: login,
            password: password,
            username: "",
            win: 0,
            lose: 0,
            error: ""
        }

        await this.SignIn(data)

        this.setState({
            login: "",
            password: "",
            errorKey: 0,
            errorPlace: 0
        })
    }

    render() {
        const { login, password, showPasswordKey, errorKey, errorPlace, SignInError } = this.state

        if (this.context.UserIsLoged === true) {
            return <Navigate to="/" replace />
        }

        return (
            <>
                <label>Вход</label>
                <div>
                    <label>логин</label>
                    <input name="login" value={login} onChange={(e) => this.UpdateData(e)} />
                </div>
                <div>
                    <label>пароль</label>
                    <input type={showPasswordKey ? "text" : "password"} name="password" value={password} onChange={(e) => this.UpdateData(e)} />
                    <button onClick={this.ShowPassword}>{showPasswordKey ? "Скрыть" : "Показать"}</button>
                </div>
                <button onClick={this.LogButtonClicked}>Войти</button>
                <p>Впервые тут? Тогда можно <Link to="/sign_up">зарегистироваться</Link></p>
                {errorKey === 1 && <p>Одно или более полей пусты<br></br>
                    Пожалуйста, заполните пустые поля!</p>}
                {errorKey === 2 && <p>В начале или конце {errorPlace} есть пробелы<br></br>
                    Пожалуйста, напишите без них!</p>}
                {SignInError !== "" && <p>Ошибка: {SignInError}</p>}
            </>
        )
    }
}