import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Login from './screens/Login'
import List from './screens/List'
import Book from './screens/Book'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book,
    })
)

export default Routes