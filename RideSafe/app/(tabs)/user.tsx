import React, { useState, useRef } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  StyleSheet, 
  Dimensions, 
  Text, 
  Platform,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { Card } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');

const categoryData = [
  { name: 'Fighting/Violence', color: '#233D4D' },
  { name: 'Gun/Weapons', color: '#D0DB95' },
  { name: 'Knife/Sharp Objects', color: '#67B8CA' },
  { name: 'Needles/Drugs', color: '#F4A4B9' },
  { name: 'Harassment', color: '#CC93DC' },
  { name: 'Theft', color: '#A8461F' },
  { name: 'OTHER', color: '#6A6AC1' },
];

const stationData = [
  { name: 'Government Center' },
  { name: 'Bay/Enterprise' },
  { name: 'Corona' },
  { name: 'Central' },
  { name: 'Churchill' },
  { name: 'Coliseum' },
];

const newsUpdates = [
  { title: "Security Increased at Southgate", content: "Due to recent incidents, security has been doubled..." },
  { title: "New Safety Measures", content: "Starting next week, all stations will have..." },
  { title: "Incident Report Update", content: "The recent theft at Century Park has been..." },
  { title: "Station Maintenance", content: "Health Sciences station will be closed..." },
  { title: "Vandalism at Clareview Handled", content: "Graffiti at Clareview station has been removed, and security cameras installed." },
  { title: "Escalator Repaired at Churchill", content: "The broken escalator at Churchill Station is now fully operational." },
  { title: "Lighting Restored at Bay/Enterprise", content: "All flickering lights have been fixed, improving visibility at night." },
  { title: "Delayed Trains Back on Schedule", content: "Technical issues causing delays have been resolved, and trains are running as scheduled." },
  { title: "Unauthorized Entry Prevented", content: "A new security system has been installed to stop unauthorized access at University Station." },
  { title: "Emergency Exits Unblocked", content: "Obstructions in emergency exits at Corona Station have been cleared for safety compliance." },
  { title: "Suspicious Activity Addressed", content: "Recent concerns about suspicious activity at McKernan Station have been handled with increased patrols." },
  { title: "Lost Items Policy Improved", content: "A new lost-and-found system is in place, making it easier to recover lost belongings." },
  { title: "Noise Complaints Resolved", content: "Excessive noise from maintenance work has been reduced with revised schedules." },
  { title: "Public Restrooms Reopened", content: "Restrooms at Central Station are now open after plumbing repairs." },
];


const PAGES = [
  { id: 'report', title: 'REPORT' },
  { id: 'review', title: 'REVIEW UPDATES' }
];


const AnalysisScreen: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<boolean[]>(new Array(categoryData.length).fill(false));
  const [selectedStations, setSelectedStations] = useState<boolean[]>(new Array(stationData.length).fill(false));
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePageChange = (index: number): void => {
    setActivePage(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / screenWidth);
    if (pageIndex !== activePage) {
      setActivePage(pageIndex);
    }
  };

  const handleCategoryChange = (index: number) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] = !newSelectedCategories[index];
    setSelectedCategories(newSelectedCategories);
  };

  const handleStationChange = (index: number) => {
    const newSelectedStations = [...selectedStations];
    newSelectedStations[index] = !newSelectedStations[index];
    setSelectedStations(newSelectedStations);
  };

  const renderCheckbox = (isSelected: boolean) => (
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && <Text style={styles.checkmark}>✓</Text>}
    </View>
  );

  const renderReportPage = (): JSX.Element => (
    <View style={styles.page}>
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Select Category</Text>
          <View style={styles.checkboxContainer}>
            {categoryData.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.checkboxItem}
                onPress={() => handleCategoryChange(index)}
              >
                {renderCheckbox(selectedCategories[index])}
                <Text style={styles.checkboxLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.checkboxContainer}>
            {stationData.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.checkboxItem}
                onPress={() => handleStationChange(index)}
              >
                {renderCheckbox(selectedStations[index])}
                <Text style={styles.checkboxLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Emergency Report</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );

  const renderReviewPage = (): JSX.Element => (
    <View style={styles.page}>
      <Card style={styles.chartCard}>
        <Card.Content>
          <ScrollView 
            style={styles.newsScroll}
            showsVerticalScrollIndicator={false}
          >
            {newsUpdates.map((item, index) => (
              <View key={index} style={styles.newsBox}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsContent}>{item.content}</Text>
              </View>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.pageSelector}>
          {PAGES.map((page, index) => (
            <TouchableOpacity
              key={page.id}
              style={[
                styles.pageSelectorButton,
                activePage === index && styles.activePageButton
              ]}
              onPress={() => handlePageChange(index)}
            >
              <Text style={[
                styles.pageSelectorText,
                activePage === index && styles.activePageText
              ]}>
                {page.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {renderReportPage()}
          {renderReviewPage()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#023E8A',
  },
  container: {
    flex: 1,
  },
  pageSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  pageSelectorButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  activePageButton: {
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pageSelectorText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activePageText: {
    color: '#333333',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width: screenWidth,
    padding: 16,
  },
  chartCard: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginVertical: 16,
    textAlign: 'center',
  },
  checkboxContainer: {
    marginBottom: 16,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#666666',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: '#023E8A',
    backgroundColor: '#023E8A',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333333',
  },
  emergencyButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  newsScroll: {
    maxHeight: screenWidth,
  },
  newsBox: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: '#666666',
  },
});

export default AnalysisScreen;