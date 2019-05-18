import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { Query, withApollo } from 'react-apollo';
import * as d3 from 'd3';
import { removeBlanksByKey, get_age } from '../providers/Functions';

//Components
import { StatsBox } from '../components/widget/StatsBox/StatsBox';

//Charts 
import { LineChart_GeneralComponent } from '../components/recharts/LineChart_General';
import { Pie180ChartComponent } from '../components/recharts/PieChart';

//Query
import { allRecordsByOrganization as allOrg, all_records} from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		//alignItems: 'flex-center',
		alignContent: 'flex-start',
		paddingTop: '5%'
		
	},
	row: {
		//height:'100vh',	
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}


class DemographicsAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			results:null,
			all: null,
			sexes: null,
			educations:null,
			ageMetrics:null
		}
	}

	/*https://github.com/apollographql/react-apollo/issues/1411*/
	componentWillMount = async () => {
		const {client} = this.props;
		//let res = await client.query({query: allRecordsByOrganization,variables: {organization:this.state.organization }});
		let res = await client.query({query: all_records});
		this.setState({results: res.data.getPeople})
		//console.log(this.state.results);
		await this.dataWrangle()
	}
	
	async dataWrangle(){
		var modData = this.state.results

		//get ages from date of births
		for(let i =0; i< modData.length; i++ ){
			modData[i].age = get_age(modData[i]['dob']);
		}

		var allCounts = d3.nest()
			.rollup(function(v) { return v.length; })
			.object(modData);

		var sexCounts = d3.nest()
			.key(function(d) { return d.sex; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		
		var sexCounts = await removeBlanksByKey(sexCounts,"key")
		
		var educationCounts = d3.nest()
			.key(function(d) { return d.educationLevel; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);

		educationCounts.sort(function(a,b) {
			return b.value - a.value;
		});

		var educationCounts = await removeBlanksByKey(educationCounts,"key")

		var ageAverage = d3.nest()
			.rollup(function(v) { return d3.mean(v, function(d) { return d.age; }); })
			.object(modData);

		var ageCounts = d3.nest()
			.key(function(d) { return d.age; })
			.rollup(function(v) { return  v.length })
			.entries(modData);

		ageCounts.sort(function(a,b) {
			return b.value - a.value;
		});

		//console.log(ageAverage,ageCounts)
		
		var roundedNumber = Math.round(ageAverage * 10) / 10

		




		this.setState({
			all: allCounts,
			sexes: sexCounts,
			educations: educationCounts,
			ageMetrics : [roundedNumber,ageCounts]
		})

	}

	
	

	render() {
		return (
				<Container style={styles.container}>
				{ this.state && this.state.sexes && this.state.educations &&
					<Row style={styles.row}>
					
						<Col>
							<StatsBox
								Cardsubtitle={"Metrics on Records"}
								Cardtitle={" All Records: " + this.state.all}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.sexes}
									valueKey="value" 
									/>
							</StatsBox>
								
						</Col>
					
						<Col>
							<StatsBox
								Cardsubtitle={"Metrics on Education"}
								Cardtitle={" Highest: " + this.state.educations[0].key}
								Cardtext={this.state.educations[0].value}
								height="300px"
							>
								<Pie180ChartComponent 
								data={this.state.educations}
								valueKey="value" />
							</StatsBox>
						</Col>
						<Col>
						<StatsBox
								Cardsubtitle={"Metrics on Age"}
								Cardtitle={" Average: " + this.state.ageMetrics[0]}
								Cardtext={""}
								height="300px"
							>
								{/*<Pie180ChartComponent 
								data={this.state.ageMetrics[1]}
								valueKey="value" /> */}
							</StatsBox>
						</Col>
							
					</Row>
					}
					<Row style={styles.rows}>
						<Query query={all_records}>
						{({ data, loading, error }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							return (
								<LineChart_GeneralComponent data={data} />
							);
						}}
						</Query>
					</Row>
				</Container>		
		);
	}
}


export default withApollo(DemographicsAnalytics);
