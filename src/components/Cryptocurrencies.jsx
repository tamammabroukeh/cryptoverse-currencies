import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Col, Row, Card, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  console.log(cryptos);
  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      )}
      <Row className="crypto-card-container" gutter={[32, 32]}>
        {cryptos?.map((currency, i) => (
          <>
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
              {/* <Link to={`/crypto/${currency.uuid}`}> */}
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img className="crypto-image" src={`${currency.iconUrl}`} />
                }
                hoverable
              >
                <p>Price:{millify(currency.price)}$</p>
                <p>Market Cap:{millify(currency.marketCap)}</p>
                <p>Daily Change:{millify(currency.change)}</p>
              </Card>
              {/* </Link> */}
            </Col>
          </>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
