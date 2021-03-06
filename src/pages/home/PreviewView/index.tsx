/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FaAt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import AvailableHeight from './AvailableHeight';
import Row from './Row';
import coverPhoto from './mjewell.jpg';

export default function PreviewView() {
  return (
    <AvailableHeight>
      <div
        css={css`
          align-items: center;
          background-color: #e9e8e9;
          color: #111;
          display: flex;
          height: 100%;
          justify-content: center;
        `}
      >
        <div
          css={css`
            background-color: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
              0 1px 3px 1px rgba(60, 64, 67, 0.16);
            height: 600px;
            width: 350px;
          `}
        >
          <img
            css={css`
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
              height: 300px;
              object-fit: cover;
              object-position: 0 0;
              width: 350px;
            `}
            src={coverPhoto}
            alt="Michael Jewell (and Growler)"
          />
          <div
            css={css`
              padding: 1rem;
              font-size: 1.2rem;
            `}
          >
            <h1
              css={css`
                font-size: 2rem;
                margin-top: 0rem;
                margin-bottom: 2.5rem;
              `}
            >
              Michael Jewell
            </h1>
            <Row
              Icon={FaMapMarkerAlt}
              label="Location"
              text={
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.google.com/maps?q=santa+barbara&um=1&ie=UTF-8&sa=X&ved=0ahUKEwi88Y6D5KjiAhUGXKwKHakCB7MQ_AUIDigB"
                >
                  Santa Barbara, CA
                </a>
              }
            />
            <Row
              Icon={FaAt}
              label="Email"
              text={
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="mailto:mjewelldev@gmail.com"
                >
                  mjewelldev@gmail.com
                </a>
              }
            />
            <Row
              Icon={FaPhone}
              label="Phone"
              text={<a href="tel:+18052841748">(805) 284-1748</a>}
            />
          </div>
        </div>
      </div>
    </AvailableHeight>
  );
}
