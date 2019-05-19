/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FaAt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import AvailableHeight from './AvailableHeight';

function Row({
  Icon,
  text,
  label
}: {
  Icon: any;
  text: React.ReactNode;
  label: string;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5rem;
      `}
    >
      <div
        css={css`
          width: 40px;
          margin-right: 1rem;
        `}
      >
        <Icon
          css={css`
            color: #0f89e2;
            font-size: 2.5rem;
          `}
        />
      </div>
      <div>
        <div>{text}</div>
        <div
          css={css`
            color: #777;
            font-size: 1rem;
          `}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

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
          <div
            css={css`
              background-color: #aaa;
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
              height: 200px;
              width: 350px;
            `}
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
                margin-bottom: 4rem;
              `}
            >
              Michael Jewell
            </h1>
            <Row Icon={FaMapMarkerAlt} label="Location" text="Santa Barbara" />
            <Row
              Icon={FaAt}
              label="Email"
              text={
                <a href="mailto:michaeljewell9911@gmail.com">
                  michaeljewell9911@gmail.com
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
