import {
  NotFoundBgContainer,
  NotFoundImg,
  NotFoundHeading,
  NotFoundDesc,
} from './styledComponents'

const NotFound = () => (
  <>
    <NotFoundBgContainer>
      <NotFoundImg
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
        alt="not found"
      />
      <NotFoundHeading>Page Not found</NotFoundHeading>
      <NotFoundDesc>
        We are sorry, the page you requested could not be found
      </NotFoundDesc>
    </NotFoundBgContainer>
  </>
)

export default NotFound
