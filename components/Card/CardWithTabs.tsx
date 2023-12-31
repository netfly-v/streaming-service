'use client';
import {useRouter} from 'next/navigation';

import {POSTER_IMG_URL} from '@/constants/api';
import {CardVariants, MoviesPaths} from '@/constants/common';
import {ICardWithTabs} from '@/types/data';
import {Progress, Typography} from 'antd';
import {useState} from 'react';
import {
  CardSubTitleText,
  ContentElementWrapper,
  ImageWrapper,
  ImageActive,
  InnerCardContentWrapper,
  StyledCard,
  StyledTitle,
} from './styles';
import Image from 'next/image';

const {Text} = Typography;

const tabList = [
  {
    key: 'tab1',
    tab: 'Today',
  },
  {
    key: 'tab2',
    tab: 'This week',
  },
];

type CardWithTabsProps = {
  title: string;
  dayData: ICardWithTabs[];
  weekData: ICardWithTabs[];
  path: string;
};

type CardContentProps = {
  data: ICardWithTabs[];
  path: string;
};

export const CardWithTabs: React.FC<CardWithTabsProps> = ({title, dayData, weekData, path}) => {
  const [activeTabKey, setActiveTabKey] = useState<string>(tabList[0].key);
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const contentList: Record<string, React.ReactNode> = {
    tab1: <CardContent data={dayData.slice(0, 7)} path={path} />,
    tab2: <CardContent data={weekData.slice(0, 7)} path={path} />,
  };

  return (
    <StyledCard
      $variant={CardVariants.PRIMARY}
      style={{width: '100%'}}
      title={title}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}>
      {contentList[activeTabKey]}
    </StyledCard>
  );
};

const CardContent: React.FC<CardContentProps> = ({data, path}) => {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`${path}/${id}`);
  };

  return (
    <>
      {data.map((d) => (
        <ContentElementWrapper key={d.id} onClick={() => handleClick(d.id)}>
          <ImageWrapper>
            <ImageActive>
              <Image src={`${POSTER_IMG_URL}${d.image}`} width={220} height={330} alt="film poster" />
            </ImageActive>
          </ImageWrapper>
          <Progress percent={Math.round(d.vote * 10)} strokeColor={{from: '#108ee9', to: '#87d068'}} />
          <StyledTitle level={5}>{d.title}</StyledTitle>
          <InnerCardContentWrapper>
            <CardSubTitleText>Release:</CardSubTitleText>
            <Text type="secondary">{d.releaseDate}</Text>
          </InnerCardContentWrapper>
        </ContentElementWrapper>
      ))}
    </>
  );
};
