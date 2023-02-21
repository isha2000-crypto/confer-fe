import { render, screen } from '@testing-library/react'
import HomePage from 'src/pages/home'

describe('Home', () => {
  it('Renders a paragraph', () => {
    render(<HomePage />)

    const heading = screen.getByText(/Kick start your project/i)

    expect(heading).toBeInTheDocument()
  })
})
