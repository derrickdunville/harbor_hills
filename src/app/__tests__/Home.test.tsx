import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import App from '../page'
import { Provider } from '@/components/ui/provider'

describe('Home Page', () => {
  it('should render the main heading', () => {
    const component = render(
      <Provider>
        <App />
      </Provider>
    )
    component.getByText(/Harbor Hills Association/i)
  })
})
