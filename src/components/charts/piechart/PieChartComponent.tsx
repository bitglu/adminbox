import { ResponsivePie } from '@nivo/pie'

const data = [
  {
    "id": "projects1",
    "label": "Project 1",
    "value": 471,
    "color": "hsl(120, 70%, 50%)"
  },
  {
    "id": "projects2",
    "label": "Project 2",
    "value": 323,
    "color": "hsl(100, 70%, 50%)"
  },
  {
    "id": "projects3",
    "label": "Project 3",
    "value": 287,
    "color": "hsl(175, 70%, 50%)"
  },
  {
    "id": "projects4",
    "label": "Project 4",
    "value": 197,
    "color": "hsl(31, 70%, 50%)"
  },
  {
    "id": "projects5",
    "label": "Project 5",
    "value": 161,
    "color": "hsl(286, 70%, 50%)"
  }
]

const MyResponsivePie = () => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'projects2'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'projects3'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'projects1'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'projects5'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'projects4'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsivePie;