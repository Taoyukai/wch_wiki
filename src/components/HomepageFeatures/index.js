import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'official website',
    //Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <a target="_blank" rel="noopener noreferrer" href="http://www.wch-ic.com/">WCH</a>
      </>
    ),
  },
  {
    title: 'order',
    //Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <a target="_blank" rel="noopener noreferrer" href="https://lcsc.com/brand-detail/271.html">LCSC</a>
      </>
    ),
  },
  {
    title: 'More',
    //Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/openwch">GitHub</a>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
