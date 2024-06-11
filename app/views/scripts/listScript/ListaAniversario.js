document.addEventListener('DOMContentLoaded', async () => {
    let currentPage = 0;
    const itemsPerPage = 30;
    let data = [];
    const tbody = document.getElementById('aniversariantes');
    const prevBtn = document.getElementById('prev'); //Variavel para estilizar o botão avançar ficar cinza
    const nextBtn = document.getElementById('next'); //Variavel para estilizar o botão voltar ficar cinza
    const pageNumberSpan = document.getElementById('page-number');
    const totalPagesSpan = document.getElementById('total-pages');

    // Buscar dados e inicializar a tabela
    async function fetchData() {
        try {
            const response = await fetch('/api/lista-aniversarios');
            data = await response.json();
            updateTable();
            updateButtons();
            updatePageInfo();
        } catch (error) {
            console.error('Erro ao carregar lista de aniversariantes:', error);
        }
    }

    // Atualizar a tabela (somente a visualização na web, se necessário)
    function updateTable() {
        tbody.innerHTML = '';

        const start = currentPage * itemsPerPage;
        const end = Math.min(start + itemsPerPage, data.length);  // Ajuste para evitar ir além do comprimento dos dados
        const pageData = data.slice(start, end);

        pageData.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${new Date(item.data_nascimento).toLocaleDateString('pt-BR')}</td>
                <td>${item.idade}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Atualizar os estados dos botões
    function updateButtons() {
        prevBtn.classList.toggle('disabled', currentPage === 0);
        nextBtn.classList.toggle('disabled', (currentPage + 1) * itemsPerPage >= data.length);
    }

    function updatePageInfo() {
        const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));  // Garantir que o mínimo seja 1
        pageNumberSpan.textContent = currentPage + 1;
        totalPagesSpan.textContent = totalPages;
    }

    // Funções para os botões de AVANÇAR e VOLTAR
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateTable();
            updateButtons();
            updatePageInfo();
        }
    });

    nextBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < data.length) {
            currentPage++;
            updateTable();
            updateButtons();
            updatePageInfo();
        }
    });

    // Buscar dados ao carregar a página
    fetchData();

    document.getElementById('printBtn').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.addFont('https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnedw.ttf', 'Poppins', 'normal');
        doc.setFont('Poppins', 'normal');
        doc.setFontSize(22);

        // Adicionar título centralizado abaixo da logo
        const title = "Lista de Aniversariantes";
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = pageWidth / 2;
        const titleY = 35; // Ajuste este valor conforme necessário para a posição vertical

        const addHeader = () => {
            const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAABbCAYAAADk35cCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAEHZSURBVHgB7V0HgFxVuf7OnbIlPSQQAoaAiEpREUSKQCDJJnQQg9I0FDebTWjCE3hYgljQBwRIJSJFEISoSE2HUEIHASlKDTWVZDdl28w9533/ubMz906fJVXvB5OdueXcc+895z9//4EQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIiNA4UQIUJsGjQO6Q4d/z1gBsCJXYCpD72ErRH19TFE390ViG4DnRwIg0GIqJ1gVH8o8xSMvh/TFryLrRRRhAgRYhOhtjuQ3J9fBkN39MbWiBtIEP+x+EISwLNI/AaRr4pb1krLTiP/fwdwjse4ukswee6z3GfytvHS+/tzz3AS0Rcxbe7fsQUh5BRDhNhUaDxyADmrp0g5BvNzGKbPX4itARNGxbGsZUcYdxCUewWJ2UEoTTsSJHjXQTnXY9uOJVgZ3xWu+jrPPwhancT9/dJHKtwO40zCgPZXMGFhGzYzQqIYIsSmwtZGFCcMiWJZfAr7egQJYRW31PLTvYIWXH5WQqmVPH8g26nh7+oCx5IY8jhlFvP7q/bjqDeRUJ/yqktw7Zwl2EQIxecQIf5b0VC3LQYcuBITJui8+5fHSQzN91GYkJVChJ/t2MZ2ZRzLaxhyo9iR379lt7hGWliKdhLIxhFjMXXO29gECIliiBD/taA+b9miZzB2xLXQJFzKHMWN3yTHVmN3a2yDAEFUL/Kcr2NTwtAoBQzg3wVoHHYqps5/AhsZIVHckjFhgoPmp3pT6sis5C1uFDPuX1n0vAtG1aBj/eeQTPSEinjiTkRruJG1iLSvQv9tlmDCzI7AOaOoN+q/vi/i8Ta0tcSpLK8N7HecNmzbbVXOeZ0454gdkXA7UF2bf39ibQRR1Q3Xzf8gva3+mH6ojSTtd9Xq2L8T56xCIZx5bA9Ut+1FpU8UcfVq0WNDFMeYuu+Q0FCkxbdJ/YbC4TM16ObtNPnPcfCoJZ5QO2DTYxB1kcfwb0gU/7txfzVa+14Otd4TJ4xxSJxkUIzLOVQI6LLnBkMlTkZr09HcsjOJRy8oTfufMdTuUJRJriVh/BRLmz5Bw4g/obpmJq79e5M9v8/qAVSET0R7YheeV0vLYjzQvnbX8rxVGDP8YeqIpmP63OWB/Ql3Mju4C9rXu3lvxTgRrw/Yw/4W9xTTxuthT6997lPODH6bjEKo6hjJSXknJ6VCK0RZ/1eEqAzGKIwfMYyi6fXI2BR6FaKDPjTz2T/OR78rjy1FFA02jr1iW2wChERxS8aEF1qo9+nBgfw1b4OMM4o8OceJdXDR92HUZTx2cGoruUl1K4fny9wmFr1tOKD34V8hmF8gFToUreu/yu/j7dFO1KFlcBcen7qW6eDlZvN3B9s9nN8Hp7pwqDUSNIw8A9NnL073QZHLMNir+ORSGWV5nGOvzeqPvpa+NZgSSnxTB6unsq4fp9EQcC+tlUmEKB/jjtqOC9A1/LZ9RecpvAcVe4rDYif+GMktsSLHNvP9bAyXo+4YPaQat2xcC7WDEFsXlMoWe6mKbv4fEq7fWqumUhS11V/gOkOgB59Djm4abph/Mz9XYUDiDGjnUOqOHvFONv9Ot6Nj6ziQ1/haXs3JcxGc3meQDh3MfXN9+4bwhP8Ndswsyernj8k+7kyOcw9LRJUeDsdciOL3Vniw1x/+ebazX+ZY8y0srd4RISqDSZzLf76IiqEWYsqDy/g+Z/LH4hIHt/Aa72CDQ+1CdcteViraiAg5xS0dyrRmcV9BsbVv8wlcmS8lN+jpgzSeQ0Rdiul5LHWeD9g/ML7uLCRJ5KLq5fS+2rVJtMdb2E76wohE12LqzHX88ToahlG0VXW+fh0aaNvAzer3y5i2cHHq1+s5fVnT00VV26eZ60nfzUcoBBU7iBPyC74NfeEkjuSXqQhRARR1iCZW8Wkai7hoycv6mGNhHtv5QsFjDeUA5TzOd/t5bFh8jWqYP2P5onvIDPwvZhbQb39GhJzilg6jlgV/ZxEfx1yWJogChWtLuC4YTJ77HnWTp7Clf6FcaOe1rH7Fix9vig9YvSbBfq8NbHNQWBR23NH8t8bXAYeK9+9ZX7oQ5UFET+hP0CW4kfRXpf5Z4mDNUSZjqwUbFHznBruw9QvRr/lIbCSERHFrRv2Ir2d0gBCCKMTw4bLOnTr7uRxjSTGobCW3WYdNhcbh5BAURXC8xI4syuxwvoYl8cMQojQaR+yK6vg/7HPsCpxoRgdpVCm3HC5U+nW+ryZUdA31L55Tno7YmItRP6QfNgLCVXZrhkoOyVrXXkHN2rXoClp6dMBpX593393UWz68+sCAQdHgwaLtObRyigtNT8fjMKoTnCKJWEWEuBOuOpXiOEU3dTc/1FWZg1KdqOVE+g6/zEOIwhB3K3fV2RRpv4TPivph4gnxnRJHJfm+nidjt4rvaCDKhcaHJLgv81zxLChlvd4XTuxEXHDAHzHxqVZsQISc4tYMx9k9uEG9i15VCXQFM+4XUSc/97eQeks4Y33XuReR2LUoBu38BFWtt6O95U77aeoQV5pJqBTnD+lNce1ITpElSDrz0dZ+H7d2GnUi5BiOs9b3EIXRe/3uUJFT8VkgUSkSpug4EvZXwrKs1mLlUuqHTaWZcj6HqPkjzy9HVxjlmPgxWnuVEy1TEUKiuDXDqCCnb7B+w7momL4wyZsxtu6f1A/exd8UnxVFc3UenI7TMPWhpSUaOJz9OZaTaaT9ACPYxldQKdoi5Ey0EP/HEGt7w3PHUJJVpdNCsx2t799GiMKIJM6yIXSl0Zb65IG5BDqxJPUOi3NxCk9g5msdXMxWoFKYxGP854PyjsUHqGlehg2MUHz+T4IykqhJ5U3XJBCuqz32vfRvY1wkY7Nw46x8Vl9Raos7zedSvzXb/xvcnWdg+ozS3KjC6Wz/I368MDGH1mJtMuNNiFtD3cco5tgoefvw/tk2L5WjpmHKQo+TVfpBima8D9Mnda1TcP7xs9OO6CEyqB/Wi8/nhDKcs+U5/ovHfcpvQ9FVWD2iddsRVJ7EYSrfccPwe/jtx2UcvbrLklERhERxa4ahsSOwZqv+GFPPd1qUaI1JG2eU8wbi+pECx31KIjidx/4q9VvC/s5F/D0ZsKUtmEIQS2eBKc7VOu/vzYa+ar+7GEiu9fjUHk50o9MTXZuDkWgR37tnECKIiNmJC0gtyqGKGq+mjCNdJ4oGz8FJPpr67qIrUGohT/4Rzy9On5Q5IOWruhgbECFR3JrhqOcCfn7GfBm1y8U9Jz/H1Jui0TK/eGTaOQQ87uucI3oimeyXmTuKPGf0JopMX+ZEEX2U8J+7kYxNQ/0xJ6d0kBsZWhTug1N9vbPgvFa8M9eMQkgUc6FiPbmixMriFKEfIBXdGeUdnOdaEJ/ayy2317XzvWgtHXmfhPVDSKhqMRg1gAffSs7yXRJSGlvcuTis7/04aWbXiHEKoU5xa0Y08hD8OiCFb2B9a+G4VHHeNgV0RhFJyKAiOdtj5nds16fjUUch0nE8NjYuOUpE4+Ng78+5gn/PgNFHeB9zJn//Osvlow7njxyMEEG4ie4lOS4LMW44L1I1UZ4+Lx+MWQS987PoEuT6ar731bSQ4K0p7zxzCP8ZzWuP5Tl34JGmyThvZBcidjIIieIWD1NTcNekWaLIvidzKLrRevcDbEhMni+OutdzJW5PXYQWXz0BjcO+XPxE57ONreZ2El41iN9ewuE9L8f0ebfghgWzvc/8mzFgBxJK9Q/fGV9EhzsCIYIw5q0yDR7v8bhmuMkXy7T+5kKpSZgxo2s6PqUXoRr3Zn6bLrCrqoZzoAHtegbGDd0GXURIFLd4qKDLgUK3wG8Hvwu6PpjRGDt8VN6mbMyoKvOdi1HE9RI01Fb/kZPrMd/OXaEt91YMXc9oIsYBOKewD1L/Y2ZecWjCLcLxzvJtiUOreoQQVUh/SxTq94nBie5vsySVhFli0771jH9IAiULbaVEqRlfWzUr2KQpLzmtwgoS1CvTqeAcE7Whgl0GuUc3eh7qR1SW9CKFUKe4tUGb4Ao4Ze7LaBwxngNQ0m5J5uL+/HsjjRL7cbDdg6rk+2ivdqmjqcGyJ8Vokd+vy0Spe0Kf9G/JWYhULsar71+JsUN/R4X9AfDS0dO8Y45FY913ef27rbZRqd4Izr0T0TBsP47wvtwvk2Nb7q8hx3dA+goStpUPSu3LYyW2mtZp9SgKwYneS/HwMojhxbuJr+GHw4/F7+fdh/9WSIKQZNNv+HC+zke/PCVe1pR9/lVz1+PCY8ZjXWsz3wMt/2UyTko9gzEvJLK29S+PtqpbacbLRCq5WnxT+1VElyUSxq8mUPpS9vwH1DeSUKsH0Es/jt/Oby6nqZBT3JIxerQQE+EMdVp8dbL0fhKkP23ubETc4/j97yk9W08SlYt41l1oizwAk5iFpOFfcwsH2hd4jFitP/Gy5LR4SvGOKlmda+zg6gy1SrqZ8VHlPs/j7/euKccozfYvRePI3ew2g77wRrFMDHJx5mh2dhz//oDX/S4/El62Z7q9+n2iFJGCBNqoT2yC3AiE05WkBc+SoL+JQtAUC1Ug6aikSj3NRnD8t6L/GiGCJ/JN0HIvvqEVEMROyCKonLv4bCtJ4rs6Z4uyC3RpRNXtlhh3wjg9+E+lIXwvBH55BFLUL2P44w9oUnMwdsQ0NIw4sZSzf8gpbskYvBhYFruXxOIF6vE+tSuvQb4oAYMpD7+ICUNGYVnVATaDjZG08aaPz5osxG8Rf1N3hDdopHke23zzk3R9DtdZQ5Lyh1TQvRA9sVpmMnxfu7AJ9XW/QMRIUSEhelSEqx2h3R5eD2gddrCAf1dIGu3UWTU54n8nusWjaFOZ7N6KxLSn+2/SaBJDwwHuXE615HzcdF/hsMVpDzaRg72WHO3z6W0uJ3KfNhnXGyWDyhYL8R7QyaHkss4FcnIZJoV1suqIwuhus6N3wlEfcNFbWT5xysP1mzJD/PZcGcyiFDWS9KFShu311D0ekGfftjZ23+hv8vtpWLJKFt3ZhRoKq/mF2DwQvVciOYff9ra/FbmFaXNPx38yNlY1v/pjBsFpuxU2z2UeKPUar1fFxW7XIq20kGPb02ZQ6uyrSBj+hCPF8TwGJA5IR1SN/RYX5Box0pUuXVCd6GMX3U40DLuAnb4GleFpktGxlB7uttJQUdDKPaDXUYVKa4Tic4hNC+FoxtftjETiUnSWJpAJFan6FUJUjglDquG0k8MvQBCNkqQMomMdXKKlWrhm38x57bU8t4IqfmpvLI1ehgnHpLj/anGLKa8carsT5O6U0xcVQ+1GAt6LC0AjvxcPQRVZaPfCjuUhUQyxaZFIXk/95kxP32gtjHMoLv0PJt9ffm7HEMB5wwbZv0vjx5OCDSt4nGOuoyj6lTJ9FY+nOsU7zlh3qApKChiK3upHWNKW4gwdIYpl6naj+2S11QcVw/SlCmhvTJszn4TxpqKHav1WMQfvkCiG2MSQMplK6sb8Ck7kYFqjR2LyFl4UfkvD2KN2QQef4djhv6b++OKCxxkaoZRzB5Vk30Q5MDgEy5/1jGGO2o8bBqAy9ETEOd0aMpTlOssz8hgchgtGeNxhvXCa6gjfXuqL1eKy2nG0V65CJx9HwcQWcpzzXrFmclePxlFkeddQ96E83UA0RhV4khbBpEf1HSM12Zrh9FmBiTNz85jJzWkaBNr5X8SJUy8RLJVpIlSGRtYhqldi0qzCXuuSFNPQ0mrQjmJwXK5mibdzQoskI/OyboN4/d35glIZQjT76yxmu2/kFAG/4IAatPTeGUosrk6mLUNjQOe9J6NU+rc2YyAtvIWy0dhSn77EB+JzVUXlf6cPliRMlfY7n28npEZKZ7nP5PpaJCPBVVb6EccK67Bt763683y5hor1wgYFeXduggO0x8epsgLU1xy9A5xEjb2+/97S/eD2SHItanZYiatuW1+w7fF1X0LSaQve55qPS+a2czjIjc3K3YZk7EWUgowD6ZOK0LLMe5006yOUi4aRg+15rlaYMat4zRBJPhF5TyJ1pMDXx0gOnt1lR+SNDvf4VGEoSZpQyC4g7icX8DghFGWKo5wnOjGU4+tfWKJOgeqC/7Qx38CHa7ojpg4s36XG7IN2Je5ijyDWdgBc5c/o84ZX8MyUThCh4CUviUaiNvlIocu7umi0TC5R1M1S7e3nfCDegE+2K37vk04/75JIuWKVanoLY+v+iO0OnEfikpng7WY4rTw/ty4kWpPAqiy9gtYw7grawz7i+fdBddyRN1bS6D/zpnqyncIT0zZHvYcTOxkS+dCJi4f1wnLnEupFTuD5n8+IDpYxFsvpM1i66Dr2+940YWypFYJ4G2QAKe0LH7P3XmW/RsQaG/8Uy/Ac6kdcgxlzgllAzjmiCkn3V3w5mRRZmha/dvVDfnvSa05ReW2a0s/XbhNbW1sTj+uwJSiV6sM+ZIke7IfrnAEZOMtr+5HYT4frbptTyMqPZDtvWK+HaRan5le9je3n8mpHp87rwf50y7pOB9zIcqxb9j4a6v6C6XP/nNPu2ST8Sfd+9tG3eJh30dZX/NqKE0VtJvDf4Z7rUJsklphb/Hj9G6+spo5ysVlGYjyexoDSorYXy/0bm3bMsRUQzyh+wvt78Z8rbbp76FeAd8VZvSy/tk0K4aR020EpUhgpcuRD2P6gF7H0SbnvCiRCdTiWR9/j+NwZXYGhtTru7kHmZ8+sPW3W9zW/GN+L7/kHnIuPY/miH2VZyV3oyO3kAsWqXlzHabBjqg97F1UXKKpuxtc9Vmgc5TnReqF/KUBlrS+YWczJtCcHKCe82Ylb9+H2k0hcHkHjkOPThM2oTz1TvOmVPt9R87iN262fmoSHDeR3rgzmKJjYOWgceaZNjx+8wTZ7jZLO+FlKVQk/a1Z/YgN7e0HiEvVAkU3Z+zqI7YpS91Bu64FPn1nA796qoWItlks0VEhn3Fg+ss7DWnfjgzyEbXa+6EM50SRy5AJMm3d7+trty0nc+oqLStBip30EzliRZEDeVazzXgvds3ZTO1rWsb/VVl1c8vmQM3aivvespNJa5jzvz1/g6X8kb6FYKKlPsuLPiWgYfjoi3b+PKfd8GmhWmX5Z1swmVMeKd0YiDJQ+zF5TOB0HspgVJ4riTpIu8crxk8QDtIx+q2Q+R4nlTsQGpPL/lU5h5bjHwjiD7QMxHOMxyP0vwJYEEUuXNE/gvCuRP5JzwnEm2gW/YfhJxQ/lewuUIzVDoR2Z4z3RFVinf+e7edx/XuVz7edZ3vOdp04nAZf76pGzL9ryHukEJQx8C8Uv/qGN4tHqB8W5VI4JV0nBs8Pz7c2zgqiV1rk3/dM68t6A6nX1iEfruGJPz7RtfdoOhxv/vk1Zb7eJWJbVI2Mm8/wz0d7GTphzgEApzT1JNCbmFCBSOWLz8+mEAJBBoc7jy6N4YG5Ni7vShla/SrsRGEyl+HgmuZ0JOKz3ZahNnMDz/s86His8husfyvjAVSW17XsQj6K6djzM6lPJmbHv6infPiEKl1rXhU7MeCHBtnP96hKRj3z3NYX9pR7INPruZ17WvSfT+5Qebe9TqWs50D2uUBag7MQOitxr5zlanWDPkQ/MbSSKmRIASudyPyryEzi9T0XCFYX91TzHfw8j4K4dHygrGbeidzATjzGr0OIW5lotB2xODa7gaqR11i6OrP4acv6JG6waoGw4xYmiHXt2ImfuUasTt5iiWA3DRlDtUodlliCeVfJ4ZZ5FssebaDhBQi2L+xkaZC8uVchOSGsgWdNP47WfRikYqh80Dgn2R/wHcSM/hVVhQktgcgmiNqtT4/0FlIIyr1Ctdzjb2qXkscYUVN3kvnTjUn/j+IkD9V/OypSuqBX1w37LhyMU1qv3IClNlTkOTybugHALUedTilbByaGoC+o8f8KQ32NZjOw1xvkuehCWVIl7RqbkpkF2Rt11NhlAMSyLcnVXI2yyVdtG9CbMmOc5IHvWppUYNern6Nu0F4nHfamSjR4c6jmVXhXkkE0rmpracMsLbbZvDXW/tiFJYunysBvfmnBLS339zl2iYj5iO23e+Jz9DcODWWeM+qDkvcpAC6YNe7PkORaRNpu01Y/Wtvdxy2y5x3UYPeQn5Pj2h3DVqRM4HkZh5ZN/hCQNKNyfNWhfqwvuP/ewHaDiWTHZ5Jpbmo+Cx6mWD6Mo/re14sxjf1jUuTt9fIkCSssjkrcxWL/EUIpZGRMr5vPY3JBoIK0uBEx5RNqoZzFjZjPGDtsfpqgrsryvj9E5l/NBFugqfQGuW7CMc/9xLswP24Wp8Al8zyZ7wXrYVo6MmAqs2SlEUouv0g9wzTqvyJEJ3qtEN11iaVIQMvd9qgYu+hFVsMBbF6zPNUJkXgpsMmo3dHR48n5SrxWFYLBLscxqLwYKpR7PaVb0aMENlUckmMgX4M8qo9zc+5NasSoyHh3uU8Fz27XnEe/fRoW7TX+fglQbC9ZdJmea3BjcROl7N1n1n02kvNTvKk9CTv89et+fz7pWN+hoRh2ikxI5UNi6lw/JOHV2Zq/c/phRnsWxYIdX5m4TroKEOtby04LcXEtU4rFLl2aQWGEdOS7PnoFIirFgC4ByZNxVMM7Mx95fp7j1WBYLhbdQHE9bgiiYMf8DPtPJxeem5bb9824N59Fl1AlKCGkVKoVOjXO3VnTyhQ1fCq9w4ZCEJ/neWdY90kbgmoKSQC7RUEoGe+HB1GG5gcomhJMIcn0K67FRoCPwW+OMPsfLuJKF6bMXBwhBuUhEsp+XENjsIvDvY5NAVd7/spsu8X6qOyT3XWVV+YwS3VaNl8bKN6kU9UROa+H8d0qvzN8eJ5+iCmVZ9Nd593ckKaqZ0rrEPmsoYnKCWBFP+Y+XCXOcJZqbG05COGkxeOX3rVN4M6DySjMGbvFkr2Js0+odFCsraiiSBvqSfIgbP0U5sGoqdQMGtL9oy1EgK8NTeY14XgNeUuOXUbiftyBK9Uz+UMaXeI9+lV2c4/G7aOmZV3WTSxRdsqtGFX6Y8R6OzYgS6DetqcmWIg82lsWB5bDrNFAkN0QBmiwCRT2Io/6GMcP33SD6oUhSkh/4Y3nf5IANJuU0Kmh9LbeO7ZYEnV3kyKxEMpLlCmM0ysWZwwdyjHi5DjV+wmfycaYZcmTaGVa6EUlegX8iqEGXwT2O6ofR+U8pIx2+Yw630RC2fXN51vvaHf2ayw1z23iwRkwleuf8nJJ2b7KlKdK/4YW5JdTHKAlnKZ9T4fISSgUJR/+D30Ywj2UxUM/tTPXc16LUC5pKF3IX0WiGyTDmn/kPE2NrpJncX37OXjkLbJGrwDYaUH+XX/VSufhcYw0M+wa2GVLiDpSXglzCklwzHNkdnDr/DXxWOJH3giumrStyOLfNwtL4Fda3rqu4cEg/z1E27W2/kgT3l5jycHHO0NCC7Tgbj6vrhDJdWIXzwCspul9wo3mAK/VKdBVxdZh11QAHZnuH6CbvDex3zJFoHFI8JEw575ETOJdfsidGLcff1dT3Ho1KIQulkhrGVuS7B7r6r2zLn5VnW/4+IW1E3HyglkyLNThPP1QL16c/8G/GiOGoPa2/sFNTWmqJmJXBzOpZMCo418WirfD7shZ7Y6ZbqUygE1Ldr9IyAW/BTWb0wRHkz5hkPUvM/9iyFHn74b6d5jg9tPG+7kIBVMY9nT1kR1qQfwsgw0mI3ka5U0uKo2K9/OSFHbGsrZGdH5o6V3RTs7geXIRSULQoj62bl/ZFsjC1KT3gMbQwv4pt256mEUd0D3VZZ4srwCV8jeeTq/g7idRPMWXOOwWr3qWb11/FmBENfOi7UaA8mRu6s88vk5N6kS98AqbP63rq9g0OcwIV67taPZJJqxDYX9NMgnI8ps55u+jpnkP47mhPyvv1xFn7bjmwI7ErUQqOWo0j+ydwS96+iXGJT9tMsuOkcfitHJT13vuz2JeajyH8+0DRa0S7vwTdNAI6JrVYBqW3K3FONlKO9YeYNvfvKBdyv8Y9wIrzqmOSNco1DP8rPNckWGIplQIfXyceF+U7jW9o1A/Zxop7Xjq1IBTmYsbClbz3j/l8d0ptPQCt7je4kM3hYkGrrdmncONaOEV5ngXcXagHHlNXj6G9/pAOjYtGHkYiKUzMXoXbJdMQ9blbOVFxrdIo26Ebnivgyl4+I1nkExFjgCxDinUpKmbEiS7meWJY6dQdr+G4Lvg+S3OKBtVWGT62biJicRlwJ/r2fsjuTcC2Bxc3lyt9BZY9NRNO24NsTwhgxLq3yHfHHYcZZTjjyo0bifEUK2Hnx/rTreWE8kRWYdMd50d2Fci/kokx6Hskdvdg/IhjS3IAyjmS9y6Zrc+DF/LUYg0citxK3KndcHn7ygxjKg5y8JYj+7LvGe1o3YwcXbzIVMOIm7mY0Lrn3kc6UGd1ikrRkq1/QBnsUkya1V7y6poDLV886ZgREqmwr+fzGXvIbksacQ72G+tksRmFcjB14VK+F3FLeTVrjyx8V2Ps8EPL5uy0lkS2/dmXhbZdu03isn06T6N2olFuf2xOqCrh1vbNs0ejMwmvNn4uily3M8YasJQpYtwQQhLpblO0Fb0+foqHmy604YWCSbPWch78u/g5ioaPREaPF4kIcaukoJW49i2yhtF0d8USbSotirUS1VKgTft1o/0pnVzLsTkSo4fkOISXIz4La3omJ9v5/MiKI6tVCx/2zSRtZ2DbA38TCJfLB2NOIiESx0xxfpYB+yn/vYDc3cSS4mcnlLV4n+F9xBdR/9b7SIaVjszyM2XOa/zNvuK6gEgR6A/74epJmL+6lK8bB5zUPFHC6QjhF6U8RX9zDV/Z/ei7unKRLW9/uhJPlQNJw3UGn5NEz1xhn431OdRPlj5VS11g0fntlBIlX4WKnoFp8+/ocmU2gfVt1NIfkUgWYftWb+LOmN/Me74/cKwYYvw+n8UgQf8RSMxvsG82GgU3YeGa0tEYlmBgNERvpVRGnJ9ha9L4/PGEWzTHlkpMutFgr+uegHxSnaiKTNKTACLmteA+cxgi7afBYM8irVdb74mW9oUoGr0jOmb1G5jEzSlPAZFFShlbXuRsyUiPukOYq0okU9II95HAlq6J4It5fwlEtLiTdepkFZeTvUgYb0ZV/LiADy7KE59FyXu1JUqSfDSi3sNXdnoTYzrjQueVbkGBZnyc6fOc34ZD8WcU2Y4rGEOcDXEfkOJF5cBb9S/C2BGzra5B9Iq5YT+f472M4d/Lilz0Y7QlZlmRb8KoP2BZ01S2kwqbMrtyhRWR7X2KbKUdS4tB6a6FVAW66ryBG+bcgq5AgQOeHH9nGJUBOaOkhFX9b/mN6P6Wc/av7Euf7EexeoT1p1RqgQ1PbDzS2+cmn/RCDdPWwmpOunpe+4qSag3BlHkPUaw7mxPtBqTLEcAjjEbfhtromSi2VEtFQmNETF5NwvB8gCDrDomCEnHSmyyi7lm6WvxoyzUwbDgsbd6N4+zw/JFL4gEQWex9t4l5M8/TEymvLtl+xOlux/eY4X9LLRIFHBvtYnkInFZxwL8RY4u2KlFTLwfmtnZ2RGXZbx4tm2EqjrfQrX092vtw/idpePJF1EgIrlJ7YfnCB+FbYEtzija6Qj1tdTXT5z5gObExFQbKKz2PxpVrgxtpjVwWG7NRowaEo1jZ+xi+T5rq1Qs5IrVRI8tuSxJSRsx1AT8/I6FQpvjwkMEUd7fsZL7bJchVI7gqw9RjXN0hKBuqFt1WZI0nfXQ6usDoK0ls/pH+KH1XrjOyORpnHlF+GvrtD6RKRl9o6w0HIU7LN3N74cJFWp8CpGrHwLk32DcluR590S1sx1FnYrOARqhCERrGupmkXKOiosrKTnpROp+hxsBUW+LyU4arjXMUxgwTo0/hJBOKYq5qz9TWEU5MgRKXP2tOEZWRBAJodSfKgWRsV4X8F6294aVMkpKs7OCOZFaM5EhDmy51WNyh1VH5dYeiV7wIy6NfwMaEcC7T59zNW/0OB0CWF7upLJllP6tcDrovSPB5MUidig6z8Qj/hoDUg47iV57eLwUbrmUuQ1dh68tY38TOMUbiI8XL/Z+s8WfU3qhJlF+zV9Q2K/rewgl0Y54F7xtWx5oPYplVEv/eiax+SSISP5QVt46k6Fhp3ZDPhvOP780rSzbyQvN0HQZ0eNmXtu0pBpN3UClMqk7O6k8WoljEUifE6Bi3xcg+V+Sof2PqYx+mfy194hDPHpAGjX+YWvh0cY/qeALlwJBJMXkMUN5OcqwqVeogGUN2zRjhpiPJMdln5T7siDhZmvIy5laCyXMX818RZTPKV0NWVqtflHTHqASNI7+Rtz1xDVASKqX8FuMWVAIRB0y2AUdlEdasmhZSDEo7m98BuBjEDaffQU9Rx3JVYLuhFX/M8Mu75JJS/eGwdB6/qPoyVR8q5+MkJNbVr8uS2PXzKjJgzaRxp3btxbyWcLs+fZONpc1tR7iWdnHtEeMOuYjqbn3y9k1FTkIwcmNHRFpPw6ZEy3oRVQvX1zYmgdf6e3N4wkwpRvYMKocXsjfzNXHI/0WWS1uea2JnuI5YnYu4t+mMOkkMX1Jqwq+qUzSyaupAC7v1XG8t6tlQ1rMi28q8GIUgpVOdjoVev6kXNnnyO2q1f3ZEVZ5iM27cy3SxwWG4qs3m6n0fgnb5Y6Fjp2JDQAa8dmlkiBVwQXA4cEymQplSlcW1Si1dlZXFQ2X7zakNwU2UjhE1WaVOlS6v+LfRuYSirbq35bp0lUROPAv/+xHDzWPrdw8c31FLpbnaEcWgIseQu+plJ+qkOfktlSK2ODlxz4dgm6ZvZPqrSnPzIh5VORLZ8teSx37yzM6ckMen2n4EE+/Jb2CIx57hWPEbL+Kks+VZyDcUHOtEX3hBcrjYbLPG51zuPppKvpAFm6SkUGW+wdZ3WFCzVpycH0Jx8Fj3UvtuM1gJf4STcb5gfYIbholq6Sa2GTRoiguQMkv4N5cpEfWUo2flvbLKKc/bZhOhFMbzdozJvIUqUP+H8ya2PsBBluGSoyJw3PI5BdXODjj5V3ob99zxU96In02XY69A/RHBIHNVoD6x7ZNR9kVKYlgRMTrx0ULRj3yND/ssuy8H7g58mYO99tV6Pvy/pXetrXJQqA5x+rpOXVa6LOoyzAaoMayyCFoZGY9VTkaRYPF5ye0oK6AkDfbrbV1nUME2B+wrA/VyNu4vV7k9ksmrcX5WYfFi+eokuauhuKmsyWRmIPFGNrQzK0snyAHqHItC91UIksQ34cgkLJ5cIuoOgfjX2Tyd6s8F+/ZJtSjls0Q4sx8aDt8PWwrIZnAcnGzng8CN0hJt8gVBiFtOAX0hF7cVVd7ck8VFmYkIZrHKd9394U+6oJQQ0md9BxxBHpA6amdyyiMgCMd9kATdWKVENlzcjSkLCvV196wNFNFVofydQjAfslKO65znVbfMB4ecb3Qixp2QnoO5RMCRbNl+VhfdqIwsX/dmqnp4aYAKYPrCxWx0etbW/nCSP80UvZF2TDZRG0BrYyMa6iagkZ9l8evQ1n0G2lvuxJih3sOKxEXUEH3QSWjp/n/W2bwTNprF5/VuzKNwYhnjQq0jhXryc2gizkm9WA1xYvavkFTKx/wOx5IxKPfetS5RAMhsCO5yB67M4/l8fs7ndAUJ2RRaCn8P3TQDy6sGp4+KuIWJmXCLN9Cqa7JdCsyhaNXfRzFI6Gctx43nhvM9PocBNlefEyuekzAqjvCBRZKTTR9rRfpAFzge2lqKi9V/IGHUhiqSApltZKHURlzD5B1RhHML+9qJWA4nO5MKn130B5vNPScHNnUfDWIjUwzFypX8LT6HWYRe1AiqwL1Sp6h1hiGJxsTCXl7EShr6H54eMI24t7DnpQMfYFu3sBW/yp1RcJ/JymQkxhpdIA+DROkkaSB+ZJXolWWxLKR3FGboWLjr0oXT8kxgRwajnzg5ljCWDd3dliQPXndw8JgWya22MOvE72Fp20lpnyEn55pfYj+4ipmf85X/jP0S943TrKFDxVMOqq4YbWTAVvH8MYjFnqBOYxHG1j2BpHmcjXq1H5Q4d0d+FCiH4ArhMtnZWr6D6vgb2KaZL9y9GZkoCr4IRVFNnYUpD2ZitkcPkX7kLiCqCLdjLXMq1zotJUALYexR4tqQVeZBKuNJWUgzgQTpJ5ZbhqKFVR1gHXQ7oZ3cWry2pIO/LUdcqPwJH+IU5c7H2MM8tYRqq8rhZo3pjXjvKJY/KamjzrALq6FqIbnjayiGQ3pJ5pWXsrbugrbot1NWy85FqCeV4qVrfkgmFyfSiEDyAO0Z89p6DEFnSVWj7rX+ksUQMeR+1IeBbcochU/X7YpNAW1D00p4enDMar5vyTQu+TwR+TvyFbF37PPIpy+U7PgZLwxx1NfVV/L5PIXyIFmvXueYeaWMY4WATSnohielWK9f8G7efTb8FEFuT5nZlPbyt2XUg1Q8kIY4U1Aqp6SnojgV44+0ETq5XIOTXGOLr0OlHqyp5kMv30rtiEOoFExXnQOuBtkpubYb1owli/4PsOy/ZLf2FOTGHIdVixbBxjxShHP0I+yLT9ntXwBt9bDBogTlhPUIqFEPWMOH0qP4XbJ7y4TqZc9zJB2XeZ0P/k+Id9wYqDNrz42yjx3S5zm+rfIwU2y1Q5Zev2pfHHA/qjoes21Mz6Fnq3PaMLqwx1zznCratYQACVeSsG6xCgNJpKXv+dOBJdriiDkf8XlRV5RKj5XX6Ud9kc93Kd+pbzWViABZIFRKn0MLvIkFOdmBbU9jaZwLkD4prSsSCc1ET6G64h20tfFH8k34s8pIUhDVSs7F/aJXVlPxPeq7S9Y5kSiYhuF/sRndTSrllRBURx2Ippf+5onyZg63rYAbL8+1aers57kQXsrzqF+2BGKx164Zwvbe4pflXCQfLNmOjciIiYpFEg2sSvWtO9+N5Jp8HRsbkcjjfJ4ynkqoEMx3kUguoKh4B3v1JJY2L+a2oEpGkrXCGmKG5mlgpFWxdBIriXNvHHo9F1CJRiqVgfsDEu9POIU7gBKvR/I8miqv0p5SPfk+ggZRo18rqM5ojx/A46O+tlYhbu7njDkq51groTgP8j1J9NxuKA98r4kfUwo4a8v2n+sqRN+4PPYl6IiPA9IrMaDXm4UKYIcIsdEhDuI6+ZTnQGwOw/QSVQxH7RHHNgMlF+CgMlr/ABF1EqbMfYYqlF+y/aA7lVJice9lY/bzGW+UOQDT5j8duHbfgeKX21D0qlA3oK3jfMTjg8mcvFG0fxKeKb7Dgsa6s0iob8w65npa/nMTyYrEsGzRFC5Ivr5QH6yrzkKklRKjmhjskiR7EO5VnoEpX9UhC2hUnbBl+891FRNscoqXECLE1gxxkxkz8GUSpnKI4iC45jYa14Yh2vZ3GixGB6y+Rvfl/jtJOMelfESzoM6mzvXltKOzXLthB4qephBR5HHk1Ab0PtcyGvV1hfrl2sQOyjk7KynJ8NwukKiPqfuQJPsuTJ2bUVt8srAvIrFgIIE2N9sci2Nzss6JaovGTy2RTpXpfiWxiHaGbzrn7RAhQlQOxymVGduPncg5XYd2p5UGiNk5e3ewuRAfz3umwXE0Tu4R2JaMSGbuArkWzVxUJ8ekJa+oyWNMtNUp/2Dj2v0EUbwTsuu42CbFOGd+QzI6BWeNyOhtVVyq8/md+j8Aqgs5d89kO+OtmqMr0G6fkChuDow+vncgO8c5B/cveY7ofH44dDfqyo6neHRJ+jN2xFEYd+ROJc5WtuyrP/B9AhXzfledxiEe9yDHleusbd19aIkVJb+4/8jfTHvdy7LS2jrjqeP9v20f2T+/FVqyYPt/y/1cnCezuh/+/dKev/1sSHsyYYtB2mioK89NaENA60rirSXp7vGI6tMRdf+YY0G2uRC1WHfzWWwlTn18YFzGnPVsr0AeTTUroJdXTh7dnbkDJnkZps/NytLuSqatQn61URLGIxAzXlYgm/PSnI2MyE8bgpqUysSdjdaUNfkAdBUOhv9nis9bOmrWN9K48SsaGLzfCWsIyJ8UYnzdzkjqU7AUZ1D0+XxOYgD5rY2UsvyHDdSvde62Pnt+iFW8WV2L5kWj09dc5s6nlfZ76PRfM9E7uO8wG1/yyOpJPOfHJXNkus23Yak4Qqsr0SdxJa/xHNvwLL1iWlraJFEm5xc8X/RWuul9nkNjj416OB26+Z/8Pdjul7QexpGY+Qvs7x1W9KDC/U7u96ylSxcJJyWuFD8peI1mZy6P3y/dHpov5z8T8h776TMkmHomj9+3YHu2DbOQ/xyGTYEIXuWzFMJUidvWhXAjtBeoF61vpUBFvcVA9X0apkksxbn+lsaciNq4uJh5vp7Vq9posV+ePz2HzwVHFpOli4JZr8X31JjcyBSbt1OdwX3FFsw16WqRy6sO5rUOzhhZaQSOOxlfVImzzvQvxt/H4LPknDIYFHKKmwMmq1Z1buVCWG6tcfjJ1ANJFNAVnqWd1julx5OK7gwd3ZWr2ggOgr97FmXsw9+T0Kb/iLEjvxJoyxK3nNT0CXT3F3Zy2n39+yFq4lcU5aqCWI7finuL+VMwosIcjYtHFebk+g2UFV1cmD62WZo9BAmxozOO5Af2X8vjVgf261L+dCarPETh5KJY29oRiHiyx6u3vbR14ucnSQxsmGhx5+YNiZrqj3j9Vys6x/oZK/HNy3gHGNcjqlNnrqNBRNLK5VvwunOBPT/N8a/vJ873ufkYheB1ltsVLP/HDnxOWTknzaPo7gQzZYuT+ZLqUbzG7igGSWxh8LJXslg3wKTcv7zkNDfj2lQ2b29bVphonrrRlaE6JIqbBVn1TVSeEpzidKoxkYNjN3hlZO9H3JyGaQumWAf4GbPewdR5c6m2IXelbrJuT9Y3EEfZ2tz1Q7I5i2zisRo1fXwEIxDnKz6bY2HWHIvy7scjVCp6Dwewj+io/li9Nn92Zs8/0+O2ZAK0Jbx42exqg9rnL2mT2Ab6mbReBcUR9EU0pYhowH1sDX9eDBU7gvd1DBeoExCNnmj1XpsKPfZZxWv/NeV8XX5dHFtDWR+Ud1c8+TCf/cICJ+4NN/Fd6xrm2gqduaodG8/vCxfV60WCyXrPzqvo3hHMZzpm5AA47tlQJX137sOMOUuwNE69oxrmO55crhsMQ9RZ4aYl2y6NkChuiag/ZhDFRkmdlAp1JIeiIv+D6+flKt0ltnP7DvHJ88X9mv1prZtQ9BrGdATdk0zQaVbKmkLfQlHydJgyB9p2ba+zr37/v57UbR2f91ixKIpfqrVOmlu7VF3REkVVIgmuWo1ycctCqQCY8Q2VMDQdXYWpDy3FDXz2v5/3EiY/9HzAdWVjQ/SA0+dPIXEezf6Ufy8W/jh8X9SU1QXqywucVMux92OcP3RbxF0p6JU/i5WjMmGfKvJdBIMJZLH6OMdJ28HBHEuHojjehpvkoj5MsupPQSaTVTNcSjDinO+HMXtgAyPUKVp9yNOFXR5UpBlTH2xCduJTES2Tq/vCieYLlWyzE6mriLRfxKtlBrHSt2PK/HcKJlsSF6SGEVdxhByX8stSVgRuPPKX6X5odxV1iB0V+m1JaNSvMf7w9zHhkCdKZliXSTBu+ANcvcekQz01RuGCUT/FxJlBMTYaP4BiFLkL9Sqi6jmUDdOMzwKli9VaMXxuldUR2RQYM3QYCdVNOQ7ZFUEFnbC3+9azWPbkH/meJPNPcAxr83lasA8kN3mcFySRBxqH8987MUZ0yDqb0CXTOsFOiOjcOGIIH21xI56jJkL3aKEV/Qpe44vp5ViZCZgxL1i2xCtf/HVsWHwQcooW+pH0R+l77Afu/VDuwzAds9FY9/t0fHUn3OaRJH5zAud2ftxE8cSzRmfpFH1B7fKijfEnv23mdR5AqWzUMUcqGfpifkn83ESGS3OcNSirLKl6JUuc35FK+5u5cAxHOTAxKvcDGaoHoXXNkYFj6utjvBsx8kQ48G9CvwMLZ1hW2bovVbqWc9H+qa2v5Gzvvs9yXIkesLJa234oDEgnjhDIAufqq0j43spzrBhpaAzUI4q0NySVl/J0q+IJ7nNzQg3HHPZFHnew75imnDRlilxic+R2RNuounHOTInCtJg7MxGNTcvtg0NjkdqQnOKHvOezQ6JouR8bYeB9jHOB/Uj5Um3TKH2Jg+ksvoBZGDcisyo5EvMpqZ14joS4Abfy+222upqj3i16TRXLnuiL01+rYuQQld/Fhpa4juLxw4Kl3cXQkVW4HPugcnBBUDdm6e524dj8HerLKBG77X5irfxLwB1EmW9bQtiJmne3tyK+jcWtuqM4B2oWY0vDhsz/WQ5+O7OZIvRkaI7LrtYRF3XImMOCnKbUozFGwu5y654oGxI5oEh7O6DFnAkv2UIu96dVUCJR0QlIV0m05y+15X8zEO5yEnokv8159wtkyipwTKuf5hRPE9chxxaUq8WGgsId2N59JCSKAlmhOjF99kL7mTr3Lqzq/SMSQ8m6IivaIK6s16dreRinKW35lLrX0+dKydOfYWWvc7Bdx5/QVXR07JIl4i4rq3iUrY3iBDkJsdrlqVZWGrFfc1JcGSSM5ischDeUrJ0tBM5Rf+Ez8Vk+qfCv+jCTCi5hDvCiLdR9eepJl1HAfRPBSHyuO5F61X+ioe699EfHNp2hxY9IkoaGckoG5EUtYvHP52xNOBJql+vQbUqq1mo4HiYgn6uQWKyV9uaJZJiSOHSlvoNg1hxZwP1EUThHLuJqCjL6yWaqVn6Mw3q8nXON6ti51gizQRG5Q1RAIVEUmAIVwoTQqPY/8+F3Jnj4JkdR8bouck65xbjyIRLNXnXLr6ZnspwYldM1nfG0B1ej2rkuZbzxt3kIkmZyyap7Er3g+EV553MU5T2/OHE1MtY/ktoldXees9dii4GdxJQeqEKQLEDG1haWio6VFGDacOjRRiOQ6moxpyqO86/kbJV0a1BXdIkDNQWzZ3HcOUOsj+02TafwOPEjzYxrpdq57VY+T3+6sT78faqP85NxdyP6H7ggUDr3zGN7YOywo9jfS3l8kfKtFUFbg5wy1iE8JIqlIFya0p0hRVEKGvtiU0JtJmPYRJubcCwHiiwIvkzc6jDoxBUlRUhXrNCdnCaJi1YnW65hQdPe1hnXqNexvn0Otmys4fO/gPdxHA1uJ9gP9Bk0WN2OzYHfLVpra5soyPUrKx4n3Jc2h2en3reYPpe6c5SoiWKt+OWXF1U0+rk2E9G0HBHXmD9j++qFlCj8BD6CoBj+HpzYVQHVSv2Re6G67ZccO3/KU5agMnjFrhbyy3x+/y0cfWxnKGJofS4HKvKvtI1C5Y2pPIEilvj0pdwH1KUcaFeiXDjwibjuukAKJkOxXSI/bA2NIqjfhzo7kzVQqI/rmquLB8k32HjkGTAJ6hnhOed6VuWzaFDZvqjxJ2ZmkfcQXWhnYa9D0G81dbKOVNHrjYh7cYG+ldZbbiqIS46JLMYNsx/DloJpc6m7JpfVWPcOiZyUoI2Vf7I5EfHELQimtvOgnKs4xuVd5Xe2V+ZdGh7PhY5Sr0lDYKnYYk/8zq0vo2jocvXPsLzagWkvYrxT87Ci2wqb4zCZlPRgP+A68KVKPDWLQGotSUaei/LtDDnFcpCvrokftrwClcRaScjZrZzwldWBNibjgKqjkl/Sb7mLYZsdSueEi/YQUSJYWdDgSXxWiEuPioxhn/xOs0IOaZk0hUug9juIFnax4qdP6UeG8WieR27LLEOi6nGUh00XZ7w1QfN9KFWp21cMCX01xg07CecNGxSIcXfjjyA7oa4fBntybB6JWESSFwsx7qJrlPkYA7/FMd480qYrKwSxPPdvnkG1yyyeI6nQPvtiKcktbMYe8wBJ9jWFDgs5xXIgXvOZ3Je5g6HT0NJlmMxqHyNBTJrX2ea3UluE+zycv18rypklqnZCVH/Dd8Q66OpMASDHiZGzUF3ywZs2+xXqca6g2LInMrn9ZOwUTkAqYs+YoX9ln2UCVVsRWmGcFXsM7sMO3RajHGQXrlK0apotzI9wc8DVHdTJli/OdkKZPajauIUc1+tY2PQcGoY9Ap182Bq8GoaLHnjPAmfSeGLGoTbxf3i3z1T0a/oe3+OBqBRaRbDiyZM4FsXFqDC3KZnjjdlwVTCNeoftjUF7YhFqutVg8oMFHeFDTrEUbJYOeMniJK7XQSVZSyqHlEhwxb0njSqb3n/MiMLGDclGE9UXIlPCkeIBB53fsqsNrb2fQTEtURwKUqflo7LPqW0R38lM9EenHshRN3Y52W+hwvBlQxUzkqgNESa2SaCqP+LznItKDHEZ1PDcfUgYG9jQXdTdiVX91JK+sPL+mp2DMWAdDSyqa2NJ3Ngkr2PJxLkbkCACD3EBGYkb5i2wKptpDxaNDAqJYiksrxZdoVe/WEozxiMLsbExUPQ+6ta0oULjq4iYS62zbDaEIK5o+q5NGYVULxX1MbWRqUWvoZQTSCXGWYZSmDr3MbYuxcPLcyL2EpZmV9d7Hj1j5RU6Lwedhigx4khlRyln2Vj3uXQyi1wdsKczk+zsncd3pguzNXayo0a0k267/ph+9tizj9gRmxuy4G1/4FiyjEN5jyIRfJZIH3lGklLshLKOjTaJkWIFNiyE613uJd+AlCQpVu6hzS4ICheSgu1Nnfc3+KJP5u/fBHx+BQrvI6rGZyW4LYpQfLYweYiNpDiKHw3tisFEuLRViOOidIYOQ2ue8i0qY4fugkgkjqQjQe9NmDqvkszfwawr4tJTP+QiRGJfsCKKLRVK1r+Vq+y4Eb/ElDkv2uOESC5rvsQW8Eq7idCaFtEXY+L8VUWvaCiWL18oVsEUpyHO6yUg9TNGjZqD/k0/I6GehHKU/CrxV5j4NWnfS+XMxaodCnM3xgRLqUZ8WVokn6JqimT4GStK/5Bi30FAUxXahQu05XU7eNylkOzrJqdS4jgefyiWcnKrFhKDiPjUybNL6WMp3nVewOO8L6Go2MS2e8DhPSiK8zEj0sKZ2NzwLLPPon7YybSIU8fr8h7Uruz4TlwkxRBWAfGmhdigmCP0KhuPHyFTIIvd2KEXUyUzm+KwxD1/E4XLA9/HfjzKtq9GMSgzj+vPb+BE34S77FNEe3+Nv6XMgIjovnKqkhQCNyCS+EuW/+7zHB8z0bv5AY4ZSVkngQutNqHHIX0/wGSUjZAoeshkAmmo+ydf0DpOml1tEL0SC6q6ln+vwfW+FOnKFQNApwFmNMfEaOoCYRc8jVv45QyUC4PcVUzy0NUfMxxOx4lsUOpryKQ9gboksXSv4+Rch1bdKVInbVFwCZmLdNyOyVnO3taB2wQT0QqHJdX3KoWU/qzf5yY4fWLWuCRwUFiknbpwKZ+pcIuneNfVM4sXs1K9AnpP11cJ0sun2C+z307E/dCZG7BT16jMJ3AjnirBUJ8ZFIj3TX2Qo5vsURNHwvUvkMI5Dvcu10ko7d/crEabE15VwrtTn/wQznhJbE8+i1F8QBybJpj9RikhcNfBSa6nijsoujrUX8Y7Xg8klZ22QJyvX8E5R9yBZOIuEuH8+SUVjX3T5l3DMUAmweQXmR3ViipnXlYe0Oc4boehJvp96MgXKSn1gOv+DW3uwoIeFbYsLa83ao+D0GfQEC7I3TF1wd9QXGbKQUgUxZXF6CMC22TcG0dDJZch4nyEeEtLunZFJ2qq5qG17fhAPGknYpHFKAYnOYgDsPMXr2Pyc5VeduHbKOI9hGRkD3ZqXw4yyVzSnedHvfhR8w45mCcQ7fYu+nx9Rd6QucFDOvDJE9fw2Lugolzxk31JbJZiZSyTvdgkf04u4CoO7tLOwVJKc9SoGdiu+XV7/zpZXM/oqJ9zQN9mvw/p+8+ig1SpH/L5a5iONezrNuxzJsJF8ik+svInfDfX8b0shU4EiVMy0pNcwkCqo1yYtrdS7f0vjEsOz5U+BheLiNMXSZWxbm/T2oLl8Qu48PRE3KyipXY5CYQQ/8GkzhlCYVRX9HibF17douc5Pl7EkkU3cthlolsi0XbqCl/An2ZVnidy0qwVJHiPQgpx5cdpHL83Ysrch1EpPOI3w6p5Pn0mRvVNe1nnWfe11+aii/jPrOa3JcOK5bFfcOJfmtpC3UnkKEz3Jc4M8Z+JSqv5bQ04d/gXqKy4C9nuYBm0WkvyDfPuxFaC0NCyKSFi7LIYRW11emrLOmslDgliiK0VCaqOoL5a5IgaSgonYStCKD5vKowdcTHF9EaumtvanIDWnUJdhaG9H8YNCBFi64Tj/JXKjvU2wME43agz/pI1yBn9JsnLYorpXPgrDkncrAiJ4qaCgiRXEIW4hPG9Aa3fxox5zSFBDLFVw/OE8LwhRPfXtLAnxekkpi3c+vSuKYREcVPB85Mq21cqRIitDp6Rb8uyzHcBoU4xRIgQIXwIiWKIECFC+BASxRAhQoTwIdQphgixqVC1uhnru/2OFtte/JSfWCNEiBAhQoQIESJEiBBbAP4fhZ3PUL/bEf0AAAAASUVORK5CYII=';
            doc.addImage(imgData, 'PNG', 15, 10, 45, 15);
            doc.text(title, titleX, titleY, { align: 'center' });
            doc.setDrawColor(0);
            doc.setLineWidth(0.1);
            doc.line(20, 40, 190, 40);
        };

        let currentDataIndex = 0;
        const itemsPerPageFirstPage = 21;
        const itemsPerPageOtherPages = 24;

        const marginTopFirstPage = 45;
        const marginTopOtherPages = 20;

        while (currentDataIndex < data.length) {
            if (currentDataIndex > 0) {
                doc.addPage();
            }
            const isFirstPage = currentDataIndex === 0;
            if (isFirstPage) {
                addHeader();
            }

            const itemsPerPage = isFirstPage ? itemsPerPageFirstPage : itemsPerPageOtherPages;
            const pageData = data.slice(currentDataIndex, currentDataIndex + itemsPerPage);

            doc.autoTable({
                body: pageData.map(item => [
                    item.nome,
                    new Date(item.data_nascimento).toLocaleDateString('pt-BR'),
                    item.idade
                ]),
                columns: [
                    { header: 'Nome', dataKey: 'nome' },
                    { header: 'Data de Nascimento', dataKey: 'data_nascimento' },
                    { header: 'Idade', dataKey: 'idade' }
                ],
                startY: currentDataIndex === 0 ? marginTopFirstPage : marginTopOtherPages,
                styles: {
                    font: 'Poppins',
                    fontSize: 10,
                    cellPadding: 3,
                    valign: 'middle',
                    halign: 'center',
                    cellWidth: 'auto',
                },
                headStyles: {
                    font: 'Poppins',
                    fillColor: [255, 255, 255],
                    textColor: [1, 91, 64],
                    fontSize: 15,
                    fontStyle: 'bold',
                    halign: 'center',
                    cellPadding: { top: 3, right: 14, bottom: 3, left: 14 },
                },
                margin: { top: currentDataIndex === 0 ? marginTopFirstPage : marginTopOtherPages, bottom: 20 },
            });

            currentDataIndex += itemsPerPage;
        }

        // Adicionar rodapé em todas as páginas
        const addFooter = () => {
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                const pageHeight = doc.internal.pageSize.getHeight();

                doc.setDrawColor(0);
                doc.setLineWidth(0.1);
                doc.line(20, pageHeight - 15, 190, pageHeight - 15);

                const date = new Date();
                const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                doc.setFont('Poppins');
                doc.setFontSize(10);
                doc.text(dateStr, 20, pageHeight - 10);

                const pageStr = `Página ${i} de ${pageCount}`;
                doc.text(pageStr, pageWidth - 20, pageHeight - 10, { align: 'right' });
            }
        };

        addFooter();

        doc.save('aniversariantes.pdf');
    });
});
