import React from 'react';

import style from './Article.module.scss';
import avatar from './avatar.svg';
import like from './like.svg';

export default function Article() {
    return (
        <article>
            <div className={style.header}>
                <div>
                    <div className={style.info}>
                        <h5 className={style.title}>Some article title</h5>
                        <div className={style.likes}>
                            <div>
                                <img src={like} alt='likes' />
                            </div>
                            <span>12</span>
                        </div>
                    </div>
                    <span>Tag1</span>
                </div>
                <div className={style.author}>
                    <div className={style.author__info}>
                        <span>John Doe</span>
                        <span>March 5, 2020 </span>
                    </div>
                    <div className={style.avatar}>
                        <img src={avatar} alt='avatar' />
                    </div>
                </div>
            </div>
            <div className={style.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </div>
            <section className={style.text}>
                Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum
                Stygias neque is referam fudi, breve per. Et Achaica tamen:
                nescia ista occupat, illum se ad potest humum et. Qua deos has
                fontibus Recens nec ferro responsaque dedere armenti opes
                momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua
                huius suo omnes ne pendentia citus pedum. Quamvis pronuba Ulli
                labore facta. Io cervis non nosterque nullae, vides: aethere
                Delphice subit, tamen Romane ob cubilia Rhodopen calentes
                librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae
                Esse illo? Umeris eram similis, crudelem de est relicto ingemuit
                finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae. 1.
                Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3.
                Paris includere etiam tamen 4. Superi te putria imagine Deianira
                5. Tremore hoste Esse sed perstat capillis siqua
            </section>
        </article>
    );
}
