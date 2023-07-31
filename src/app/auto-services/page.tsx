"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import "../page.module.css";
import "../style.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="body-wrap">
      <header className="site-header">
        <div className="container">
          <div className="site-header-inner">
            <div className="brand header-brand">
              <h1 className="m-0">
                <a href="/">
                  <img
                    className="header-logo-image"
                    src="logo.jpeg"
                    alt="Logo"
                    style={{ width: 200 }}
                  />
                </a>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">
                  Auto Repair and Vehicle Audio Specialists
                </h1>
                <p className="hero-paragraph">
                  New Customer Discounts | ASE-Certified Technicians |
                  Warranties Are Available
                </p>
                <div className="hero-cta">
                  <a className="button button-primary" href="/login">
                    Go to Superservice
                  </a>
                </div>
              </div>
              <div className="hero-figure anime-element">
                <svg
                  className="placeholder"
                  width="528"
                  height="396"
                  viewBox="0 0 528 396"
                >
                  <rect
                    width="528"
                    height="396"
                    style={{
                      fill: "transparent",
                    }}
                  />
                </svg>
                <div
                  className="hero-figure-box hero-figure-box-01"
                  data-rotation="45deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-02"
                  data-rotation="-45deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-03"
                  data-rotation="0deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-04"
                  data-rotation="-135deg"
                ></div>
                <div className="hero-figure-box hero-figure-box-05"></div>
                <div className="hero-figure-box hero-figure-box-06"></div>
                <div className="hero-figure-box hero-figure-box-07"></div>
                <div
                  className="hero-figure-box hero-figure-box-08"
                  data-rotation="-22deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-09"
                  data-rotation="-52deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-10"
                  data-rotation="-50deg"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section className="features section">
          <div className="container">
            <div className="features-inner section-inner has-bottom-divider">
              <div className="features-wrap">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img
                      src="2.jpeg"
                      alt="Feature 01"
                      style={{ width: 800, height: 400 }}
                    />
                  </div>
                  <h4 className="feature-title mt-24">
                    Your One-Stop Shop for Auto Repair Services
                  </h4>
                  <p className="text-sm mb-0" style={{ color: "#FFF" }}>
                    Are you looking for experienced professionals to repair your
                    vehicle? Visit Mobile Super Service to get superior auto
                    services. From wheels and tires to engine swaps, brakes,
                    audio and more, our ASE Certified technicians can handle all
                    your auto service needs quickly and affordably.
                  </p>

                  <br />
                  <br />

                  <p className="text-sm mb-0" style={{ color: "#FFF" }}>
                    We are a family-owned business, providing quality auto
                    repairs for over 25 years. We also work with insurance
                    companies and our staff can assist you with your paperwork.
                  </p>

                  <br />
                  <br />

                  <h4 className="feature-title mt-24">
                    Auto Maintenance and Repair Services
                  </h4>
                  <ul>
                    <li>Auto repairs</li>
                    <li>Wheel services</li>
                    <li>Tire services</li>
                    <li>Alternator checking</li>
                    <li>Battery testing</li>
                    <li>Engine swaps</li>
                    <li>All electrical work</li>
                    <li>Brake services</li>
                    <li>Audio system installation and repair</li>
                    <li>Remote starter installation</li>
                    <li>GPS tracking device installation</li>
                    <li>Ignition interlock device installation</li>
                    <li>Intoxalock installation</li>
                    <li>Lighting device installation and more</li>
                  </ul>

                  <br />
                  <br />

                  <p className="text-sm mb-0" style={{ color: "#FFF" }}>
                    Stop by our auto shop for any auto service you need. FREE
                    Wi-Fi is available!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*   <section className="pricing section">
          <div className="container-sm">
            <div className="pricing-inner section-inner">
              <div className="pricing-header text-center">
                <h2 className="section-title mt-0">Unlimited for all</h2>
                <p className="section-paragraph mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut ad quis nostrud.
                </p>
              </div>
              <div className="pricing-tables-wrap">
                <div className="pricing-table">
                  <div className="pricing-table-inner is-revealing">
                    <div className="pricing-table-main">
                      <div className="pricing-table-header pb-24">
                        <div className="pricing-table-price">
                          <span className="pricing-table-price-currency h2">
                            $
                          </span>
                          <span className="pricing-table-price-amount h1">
                            49
                          </span>
                          <span className="text-xs">/month</span>
                        </div>
                      </div>
                      <div className="pricing-table-features-title text-xs pt-24 pb-24">
                        What you will get
                      </div>
                      <ul className="pricing-table-features list-reset text-xs">
                        <li>
                          <span>Lorem ipsum dolor sit nisi</span>
                        </li>
                        <li>
                          <span>Lorem ipsum dolor sit nisi</span>
                        </li>
                        <li>
                          <span>Lorem ipsum dolor sit nisi</span>
                        </li>
                        <li>
                          <span>Lorem ipsum dolor sit nisi</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pricing-table-cta mb-8">
                      <a
                        className="button button-primary button-shadow button-block"
                        href="#"
                      >
                        Pre order now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/*  <section className="cta section">
          <div className="container">
            <div className="cta-inner section-inner">
              <h3 className="section-title mt-0">
                Still not convinced on buying?
              </h3>
              <div className="cta-cta">
                <a
                  className="button button-primary button-wide-mobile"
                  href="#"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer-inner">
            <div className="brand footer-brand">
              <a href="#">
                <img
                  className="header-logo-image"
                  src="logo.jpeg"
                  alt="Logo"
                  style={{ width: 150 }}
                />
              </a>
            </div>
            <ul className="footer-links list-reset">
              <li>
                <a href="#">Main: (515) 280-7787</a>
              </li>
              <li>
                <a href="#">edwin@mss-audio.com</a>
              </li>
            </ul>
            <ul className="footer-social-links list-reset">
              <li>
                <a href="#">Mon - Fri: 8:00 am - 5:00 pm</a>
              </li>
              <li>
                <a href="#">Sat: Closed</a>
              </li>
              <li>
                <a href="#">Sun: Closed</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
