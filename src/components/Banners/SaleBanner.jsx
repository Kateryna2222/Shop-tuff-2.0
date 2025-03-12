import s from './Banner.module.scss';

const SaleBanner = () => {
    return (
        <section className={s.saleBanner}>
            <div className={s.info}>
                <p className={s.small}>NEW YEAR</p>
                <p className={s.big}>SALE</p>
                <button className={s.btn}>See more</button>
            </div>
            <div className={s.img}>
                <div className={s.text}>
                    save up to <span>50%</span> off
                </div>
            </div>
        </section>
    );
};

export default SaleBanner;