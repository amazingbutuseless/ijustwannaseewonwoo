# ijustwannaseewonwoo - server

## 사전 준비 사항
1. Nodejs 12.x 설치
2. Docker 설치
    * Elasticsearch 7.4.2 이미지 다운로드
      ```shell script
      docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.2
      ```
3. Google API 사용 설정
    * Youtube Data API 사용 활성화 
    * Service Account 생성

## 개발
### 개발 환경 구축
#### 환경 변수는 Dotenv(.env)를 이용
#### DB: ElasticSearch
```shell script
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.2
```

## 배포