import s from './Banner.module.scss';

const Banner = () => {
    return (
        <section className={s.banner}>
            <div className={s.text1}>BIG SALE 20%</div>
            <div className={s.text2}>the bestseller of 2024 </div>
            <div className={s.text3}>
                LENNON r2d2 <br/> with NVIDIA 5090 TI
            </div>
            <button className={s.btn}>Shop now</button>
        </section>
    );
};

export default Banner;