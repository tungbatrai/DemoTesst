import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    PageIndex: 1,
    PageSize: 10,
    limit: 100,
  });
  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${page.limit}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setData(data.total)
        setData(data.products);
        setTotal(data.total);
      });
  }, []);
  return (
    <div>
      <div>
        {/* Search */}
        <select>
          <option value="1">전체</option>
          <option value="2">상품명</option>
          <option value="3">브랜드</option>
          <option value="4">상품내용</option>
        </select>

        <input />
        <button>찾다</button>
      </div>
      {/* List */}
      <table>
        <tr>
          <th>상품번호</th>
          <th>상품명</th>
          <th>브랜드</th>
          <th>상품내용</th>
          <th>가격</th>
          <th>평점</th>
          <th>재고</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        {data?.map((item, idx) => {
          return (
            <tr key={item.id}>
              <td>{idx}</td>
              <td>{item.title}</td>
              <td>{item.brand}</td>
              <td styleName="description">{item.description}</td>
              <td>{item.discountPercentage}</td>
              <td>{item.rating}</td>
              <td>{item.stock}</td>
            </tr>
          );
        })}
      </table>
      {/* Pagination */}
      <div className="pagination">
        <select
          onClick={(e) => {
           
            if (page.PageSize !== e.target?.value ?? 0) {
              setPage({
                ...page,
                PageSize: e,
              });
            }
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        {page.PageIndex}
        <div onClick={()=> setPage({...page,PageIndex : page.PageIndex - 1})}> {`<`}</div>
        {<button></button>}
        <div onClick={()=> setPage({...page,PageIndex : page.PageIndex + 1})}> {`>`}</div>
      </div>
    </div>
  );
};
export default Home;
